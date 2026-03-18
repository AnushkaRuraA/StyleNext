"use client";

import { Star, MessageSquare } from "lucide-react";

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      customer: "Aarav Patel",
      salon: "GK Styles",
      rating: 5,
      date: "Oct 25, 2023",
      text: "Excellent service! The haircut was exactly what I asked for. The staff was very polite and professional.",
    },
    {
      id: 2,
      customer: "Priya Sharma",
      salon: "Urban Cut",
      rating: 4,
      date: "Oct 24, 2023",
      text: "Good experience overall. The wait time was a bit long, but the hair spa was relaxing.",
    },
    {
      id: 3,
      customer: "Rohan Gupta",
      salon: "Glow Salon",
      rating: 5,
      date: "Oct 22, 2023",
      text: "Amazing facial treatment. My skin feels so fresh and glowing. Highly recommend Neha!",
    },
    {
      id: 4,
      customer: "Kavita Reddy",
      salon: "GK Styles",
      rating: 3,
      date: "Oct 20, 2023",
      text: "Decent coloring, but not exactly the shade I showed them. Staff is nice though.",
    },
  ];

  // Helper to render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star 
        key={idx} 
        className={`w-4 h-4 ${idx < rating ? 'fill-gold text-gold' : 'fill-gray-100 text-gray-200'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold">Ratings & Reviews</h1>
          <p className="text-gold mt-1">Monitor feedback and ratings given by customers to salons.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#EBE2D3] px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 border-r border-gray-100 pr-4">
            <span className="text-2xl font-bold text-gray-900">4.6</span>
            <div className="flex text-gold">
              <Star className="w-4 h-4 fill-gold text-gold" />
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500">
            Platform Average
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#EBE2D3] p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm border border-blue-100">
                  {review.customer.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{review.customer}</h4>
                  <p className="text-xs text-gray-500 font-medium">{review.salon} &bull; {review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                {renderStars(review.rating)}
              </div>
            </div>
            
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex gap-3">
              <MessageSquare className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-gray-600 text-sm leading-relaxed">"{review.text}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
