"use client";

import React, { useState, useEffect } from "react";
import { Users, Store, CalendarDays, IndianRupee, Star } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  getDashboardStats,
  getAppointments,
  getPayments,
  getRatings,
  getSalons,
  Appointment,
  Payment,
  Rating,
} from "@/services/firestoreService";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildWeeklyChart(appointments: Appointment[], payments: Payment[]) {
  const buckets: Record<string, { revenue: number; bookings: number }> = {};
  DAY_LABELS.forEach(d => { buckets[d] = { revenue: 0, bookings: 0 }; });

  appointments.forEach((a) => {
    if (!a.date) return;
    // date format from Firebase: "26-4-2026"
    const parts = a.date.split("-");
    if (parts.length < 3) return;
    const d = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    const dayLabel = DAY_LABELS[d.getDay()];
    if (!buckets[dayLabel]) return;
    buckets[dayLabel].bookings += 1;
    buckets[dayLabel].revenue += a.totalAmount ?? 0;
  });

  // Order starting from today going back 7 days
  const today = new Date().getDay();
  const ordered = [];
  for (let i = 6; i >= 0; i--) {
    const idx = (today - i + 7) % 7;
    const label = DAY_LABELS[idx];
    ordered.push({ name: label, ...buckets[label] });
  }
  return ordered;
}

function timeAgo(ts?: number): string {
  if (!ts) return "";
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

interface ActivityItem {
  title: string;
  desc: string;
  time: string;
  ts: number;
  dotColor: string;
}

export default function Dashboard() {
  const [realStats, setRealStats] = useState({
    customers: 0, salons: 0, pending: 0, bookings: 0, payments: 0,
  });
  const [weeklyData, setWeeklyData] = useState<{ name: string; revenue: number; bookings: number }[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [stats, appointments, payments, ratings, salons] = await Promise.all([
          getDashboardStats(),
          getAppointments(),
          getPayments(),
          getRatings(),
          getSalons(),
        ]);

        setRealStats({
          customers: stats.customers,
          salons: stats.salons,
          pending: stats.pending,
          bookings: stats.bookings,
          payments: stats.payments ?? 0,
        });

        // Chart data
        setWeeklyData(buildWeeklyChart(appointments, payments));

        // Total revenue from payments
        const rev = payments.reduce((s, p) => s + (p.totalAmount ?? 0), 0);
        setTotalRevenue(rev);

        // Build salon map
        const salonMap = Object.fromEntries(salons.map(s => [s.id, s.name]));

        // Recent activity: last 5 events across appointments + payments + ratings
        const activities: ActivityItem[] = [];

        // Latest appointments
        appointments.slice(0, 5).forEach((a) => {
          activities.push({
            title: a.status === "completed" ? "Booking Completed" : a.status === "accepted" ? "Booking Accepted" : "New Booking",
            desc: `${a.serviceName ?? "Service"} at ${a.barberName ?? "Salon"}`,
            time: timeAgo(a.createdAt),
            ts: a.createdAt ?? 0,
            dotColor: a.status === "completed" ? "bg-green-400" : a.status === "accepted" ? "bg-blue-400" : "bg-orange-400",
          });
        });

        // Latest payments
        payments.slice(0, 3).forEach((p) => {
          activities.push({
            title: "Payment Received",
            desc: `Advance payment of ₹${p.advancePaid ?? 0} received`,
            time: timeAgo(p.paidAt),
            ts: p.paidAt ?? 0,
            dotColor: "bg-emerald-400",
          });
        });

        // Latest ratings
        ratings.slice(0, 3).forEach((r) => {
          activities.push({
            title: "New Review",
            desc: `${r.rating}★ rating for ${salonMap[r.barberUID] ?? "a salon"}${r.review ? `: "${r.review.slice(0, 30)}${r.review.length > 30 ? "…" : ""}"` : ""}`,
            time: timeAgo(r.createdAt),
            ts: r.createdAt ?? 0,
            dotColor: "bg-amber-400",
          });
        });

        // Sort by most recent
        activities.sort((a, b) => b.ts - a.ts);
        setRecentActivity(activities.slice(0, 6));
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const stats = [
    {
      title: "Total Customers",
      value: isLoading ? "…" : realStats.customers.toString(),
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Salon Owners",
      value: isLoading ? "…" : realStats.salons.toString(),
      icon: Store,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Bookings",
      value: isLoading ? "…" : realStats.bookings.toString(),
      icon: CalendarDays,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Revenue",
      value: isLoading ? "…" : `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      title: "Payments",
      value: isLoading ? "…" : realStats.payments.toString(),
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Dashboard Overview</h1>
        <p className="text-gold mt-1">Welcome back, here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-[#EBE2D3] p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-xl ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className={`text-2xl font-bold text-gray-800 mt-1 ${isLoading ? "animate-pulse" : ""}`}>
                  {stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-[#EBE2D3] p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Revenue &amp; Bookings</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 7 days — live from Firebase</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {isLoading ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm animate-pulse">
                Loading chart data…
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#888", fontSize: 12 }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#888", fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: "#888", fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: "rgba(92, 64, 17, 0.05)" }}
                    contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    labelStyle={{ color: "#5C4011", fontWeight: "bold" }}
                  />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="#0F2E4A" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar yAxisId="right" dataKey="bookings" name="Bookings" fill="#B28D5A" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#EBE2D3] p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h3>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-gray-200 mt-2 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-2.5 bg-gray-100 rounded w-full" />
                    <div className="h-2 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentActivity.length === 0 ? (
            <p className="text-sm text-gray-400">No recent activity found.</p>
          ) : (
            <div className="space-y-5">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${activity.dotColor}`} />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{activity.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{activity.desc}</p>
                    <span className="text-xs text-gray-400 mt-1 block">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
