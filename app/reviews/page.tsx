"use client";

import React, { useState, useEffect } from "react";
import { Star, Search } from "lucide-react";
import { getRatings, getSalons, Rating, Salon } from "@/services/firestoreService";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [salons, setSalons] = useState<Salon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStar, setFilterStar] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const [r, s] = await Promise.all([getRatings(), getSalons()]);
      setRatings(r);
      setSalons(s);
      setIsLoading(false);
    }
    load();
  }, []);

  // Map barberUID → salon name
  const salonMap = Object.fromEntries(salons.map(s => [s.id, s.name]));

  const formatDate = (ts?: number) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const filtered = ratings.filter((r) => {
    const salonName = salonMap[r.barberUID] ?? "";
    const matchSearch =
      salonName.toLowerCase().includes(search.toLowerCase()) ||
      r.review?.toLowerCase().includes(search.toLowerCase()) ||
      r.customerUID.toLowerCase().includes(search.toLowerCase());
    const matchStar = filterStar === null || r.rating === filterStar;
    return matchSearch && matchStar;
  });

  // Stats
  const avg = ratings.length
    ? (ratings.reduce((s, r) => s + r.rating, 0) / ratings.length).toFixed(1)
    : "—";
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ratings.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold">Reviews</h1>
          <p className="text-gold mt-1">Customer ratings and feedback across all salons.</p>
        </div>
        <div className="relative w-full sm:w-64 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#EBE2D3] border border-gray-100 rounded-lg text-sm text-gold-dark placeholder:text-gold-dark/60 font-medium focus:outline-none focus:ring-2 focus:ring-gold-dark/50"
          />
        </div>
      </div>

      {/* Summary Card */}
      {!isLoading && ratings.length > 0 && (
        <div className="bg-[#EBE2D3] rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 items-center">
          {/* Average */}
          <div className="flex flex-col items-center min-w-[100px]">
            <span className="text-5xl font-bold text-gray-900">{avg}</span>
            <StarRating rating={Math.round(Number(avg))} />
            <span className="text-xs text-gray-500 mt-1">{ratings.length} reviews</span>
          </div>

          {/* Distribution */}
          <div className="flex-1 w-full space-y-1.5">
            {dist.map(({ star, count }) => {
              const pct = ratings.length ? Math.round((count / ratings.length) * 100) : 0;
              return (
                <button
                  key={star}
                  onClick={() => setFilterStar(filterStar === star ? null : star)}
                  className={`flex items-center gap-3 w-full group rounded-lg px-2 py-1 transition-colors ${
                    filterStar === star ? "bg-amber-50" : "hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xs font-medium text-gray-500 w-3">{star}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-6 text-right">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter chips */}
      {filterStar !== null && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filtered:</span>
          <button
            onClick={() => setFilterStar(null)}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium border border-amber-200 hover:bg-amber-200 transition-colors"
          >
            {filterStar} ★ only &times;
          </button>
        </div>
      )}

      {/* Reviews List */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-400">Loading reviews...</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          {search || filterStar ? "No matching reviews found." : "No reviews found in Firebase."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="bg-[#EBE2D3] rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {salonMap[r.barberUID] ?? "Unknown Salon"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(r.createdAt)}</p>
                </div>
                <StarRating rating={r.rating} />
              </div>

              {/* Review text */}
              {r.review && r.review.trim() ? (
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{r.review}&rdquo;
                </p>
              ) : (
                <p className="text-xs text-gray-400 italic">No written review.</p>
              )}

              {/* Footer */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono truncate max-w-[160px]">
                  Customer: {r.customerUID.slice(0, 12)}…
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    r.rating >= 4
                      ? "bg-green-100 text-green-700"
                      : r.rating === 3
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {r.rating}/5
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
