// This file is kept for backwards compatibility.
// All data fetching has been migrated to Realtime Database.
// Re-export everything from the unified service layer.
export { getCollectionData as getSalons } from "@/services/firestoreService";
export type { Salon } from "@/services/firestoreService";
