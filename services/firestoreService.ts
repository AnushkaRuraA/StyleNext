import { ref, get, update, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { rtdb, auth } from "@/lib/firebase";

// ─── Auth Guard ───────────────────────────────────────────────────────────────
const waitForAuth = (): Promise<void> => {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      if (!user) console.warn("RTDB: Not authenticated — rules may block reads.");
      resolve();
    });
  });
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const snapshotToArray = <T>(snapshot: any): T[] => {
  if (!snapshot || !snapshot.exists()) return [];
  const val = snapshot.val();
  if (typeof val !== "object" || val === null) return [];
  return Object.entries(val).map(([id, data]) => ({ id, ...(data as object) } as T));
};

// A user is a barber if they have role="barber" OR a salonName field
// This handles barbers whose role field hasn't been set in the DB
const isBarber = (u: any) => u.role === "barber" || Boolean(u.salonName);

const safeGet = async (path: string) => {
  try { return await get(ref(rtdb, path)); }
  catch { return null; }
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Salon {
  id: string;
  name: string;           // mapped from salonName
  ownerName?: string;     // mapped from name
  salonName?: string;
  address?: any;          // { district, localArea, state }
  addressStr?: string;
  status: 'pending' | 'approved' | 'rejected';
  salonStatus?: string;
  role?: string;
  mobile?: string;
  services?: Record<string, Service>;
  createdAt?: any;
}

export interface Service {
  id: string;
  name?: string;
  price?: number;
  duration?: number;
  isAvailable?: boolean;
  category?: string;
  salonId?: string;
  salonName?: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  phone?: string;
  role?: string;
  fcmToken?: string;
  createdAt?: any;
}

export interface Appointment {
  id: string;
  customerName?: string;
  customerUID?: string;
  salonName?: string;   // mapped from barberName
  barberName?: string;
  barberUID?: string;
  serviceName?: string;
  date?: string;
  time?: string;
  status: string;
  totalAmount?: number;
  advanceAmount?: number;
  remainingAmount?: number;
  paymentStatus?: string;
  isHistory?: boolean;
  createdAt?: any;
}

export interface Payment {
  id: string;
  customerUID?: string;
  barberUID?: string;
  appointmentId?: string;
  advancePaid?: number;
  remainingAmount?: number;
  totalAmount?: number;
  status?: string;
  razorpayPaymentId?: string;
  paidAt?: any;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export const getDashboardStats = async () => {
  try {
    await waitForAuth();

    const [usersSnap, appointmentsSnap, paymentsSnap] = await Promise.all([
      safeGet("users"),
      safeGet("appointments"),
      safeGet("payments"),
    ]);

    const allUsers = usersSnap?.exists() ? Object.values(usersSnap.val() as Record<string, any>) : [];
    // Filter out ghost/orphaned accounts (no name, no email, no salonName)
    const users = allUsers.filter((u: any) => u.name || u.email || u.salonName);
    const customers = users.filter((u: any) => !isBarber(u)).length;
    const salons    = users.filter((u: any) => isBarber(u)).length;
    const bookings = appointmentsSnap?.exists() ? Object.keys(appointmentsSnap.val()).length : 0;
    const payments = paymentsSnap?.exists() ? Object.keys(paymentsSnap.val()).length : 0;

    return { customers, salons, pending: 0, bookings, payments };
  } catch (err) {
    console.error("getDashboardStats error:", err);
    return { customers: 0, salons: 0, pending: 0, bookings: 0, payments: 0 };
  }
};

// ─── Salons (barbers from users collection) ───────────────────────────────────
export const getSalons = async (): Promise<Salon[]> => {
  await waitForAuth();
  const snap = await safeGet("users");
  if (!snap?.exists()) return [];
  const all = snapshotToArray<any>(snap);
  return all
    .filter((u: any) => u.role === "barber")
    .map((u: any) => ({
      id: u.id,
      name: u.salonName || u.name || "Unnamed Salon",
      ownerName: u.name || "—",
      salonName: u.salonName,
      address: u.address,
      addressStr: u.address
        ? [u.address.localArea, u.address.district, u.address.state].filter(Boolean).join(", ")
        : "—",
      status: "approved" as const,
      salonStatus: u.salonStatus,
      role: u.role,
      mobile: u.mobile,
      services: u.services,
      createdAt: u.createdAt,
    }));
};

// ─── Customers ────────────────────────────────────────────────────────────────
export const getCustomers = async (): Promise<Customer[]> => {
  await waitForAuth();
  const snap = await safeGet("users");
  if (!snap?.exists()) return [];
  return snapshotToArray<any>(snap)
    // Exclude barbers and ghost/orphaned accounts (no name, no email, no salonName)
    .filter((u: any) => !isBarber(u) && (u.name || u.email || u.salonName))
    .map((u: any) => ({ ...u, phone: u.mobile }));
};

// ─── Appointments ─────────────────────────────────────────────────────────────
export const getAppointments = async (): Promise<Appointment[]> => {
  await waitForAuth();
  const snap = await safeGet("appointments");
  if (!snap?.exists()) return [];
  return snapshotToArray<any>(snap).map((a: any) => ({
    ...a,
    salonName: a.barberName,   // display as "Salon"
  }));
};

// ─── Payments ─────────────────────────────────────────────────────────────────
export const getPayments = async (): Promise<Payment[]> => {
  await waitForAuth();
  const snap = await safeGet("payments");
  if (!snap?.exists()) return [];
  return snapshotToArray<Payment>(snap);
};

// ─── Services (nested inside barber users) ────────────────────────────────────
export interface SalonWithServices extends Salon {
  servicesList: Service[];
}

export const getSalonsWithServices = async (): Promise<SalonWithServices[]> => {
  const salons = await getSalons();
  return salons.map((salon) => {
    const servicesList = salon.services
      ? Object.entries(salon.services).map(([sid, svc]) => ({
          id: sid,
          salonId: salon.id,
          salonName: salon.name,
          ...(svc as object),
        }))
      : [];
    return { ...salon, servicesList };
  });
};

// ─── Real-time listener for pending salons (approvals page) ───────────────────
// Since approval is tracked by salonStatus on barber users, we listen to users
export const listenToPendingSalons = (callback: (salons: Salon[]) => void) => {
  const usersRef = ref(rtdb, "users");
  const unsub = onValue(usersRef, (snapshot) => {
    if (!snapshot.exists()) { callback([]); return; }
    const all = snapshotToArray<any>(snapshot);
    const pending = all
      .filter((u: any) => u.role === "barber" && u.salonStatus === "pending")
      .map((u: any) => ({
        id: u.id,
        name: u.salonName || u.name || "Unnamed Salon",
        ownerName: u.name || "—",
        address: u.address,
        addressStr: u.address
          ? [u.address.localArea, u.address.district, u.address.state].filter(Boolean).join(", ")
          : "—",
        status: "pending" as const,
        salonStatus: u.salonStatus,
        mobile: u.mobile,
      }));
    callback(pending);
  }, (err) => {
    console.error("listenToPendingSalons error:", err);
    callback([]);
  });
  return unsub;
};

// ─── Actions ──────────────────────────────────────────────────────────────────
export const updateSalonStatus = async (salonId: string, status: 'approved' | 'rejected') => {
  const salonRef = ref(rtdb, `users/${salonId}`);
  return update(salonRef, { salonStatus: status });
};

// ─── Generic fallback (kept for backwards compat) ─────────────────────────────
export const getCollectionData = async <T>(path: string): Promise<T[]> => {
  await waitForAuth();
  const snap = await safeGet(path);
  return snapshotToArray<T>(snap);
};

// ─── Ratings / Reviews ────────────────────────────────────────────────────────
export interface Rating {
  id: string;
  barberUID: string;
  customerUID: string;
  rating: number;       // 1–5
  review?: string;
  createdAt?: number;   // unix ms
}

export const getRatings = async (): Promise<Rating[]> => {
  await waitForAuth();
  // Top-level /ratings is not in Firebase rules → read from /users/{barberId}/ratings instead
  const usersSnap = await safeGet("users");
  if (!usersSnap?.exists()) return [];

  const all: Rating[] = [];
  const usersVal = usersSnap.val() as Record<string, any>;

  for (const [barberId, user] of Object.entries(usersVal)) {
    if (user.ratings && typeof user.ratings === "object") {
      for (const [ratingId, ratingData] of Object.entries(user.ratings as Record<string, any>)) {
        all.push({
          id: ratingId,
          barberUID: barberId,
          customerUID: ratingData.customerUID ?? "",
          rating: ratingData.rating ?? 0,
          review: ratingData.review ?? "",
          createdAt: ratingData.createdAt,
        });
      }
    }
  }

  return all.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
};
