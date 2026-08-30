import { useState, useEffect } from 'react';

export default function GoogleReviews() {
  const [reviews, setReviews] = useState([]);
  const [aiSummary, setAiSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  // Get the Revital URL from .env
  const API_URL = import.meta.env.PUBLIC_GOOGLE_REVIEWS_ENDPOINT;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!API_URL) {
          throw new Error("Review API URL is missing in .env");
        }

        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        
        // Handle the data structure
        const reviewsList = data.reviews || [];
        const summary = data.aiSummary || null;
        
        setReviews(reviewsList);
        setAiSummary(summary);
        setLoading(false);

      } catch (err) {
        console.error("Review Fetch Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
      <p className="text-gray-500 text-sm animate-pulse">Loading reviews…</p>
    </div>
  );

  // On any failure, fall back to a working link instead of vanishing.
  if (error) return (
    <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
      <p className="text-gray-600 mb-4">
        Our latest patient reviews are on our Google profile.
      </p>
      <a
        href="https://www.google.com/maps/place/Revital+Dental/@31.05756,-97.3760514,17z/data=!3m1!4b1!4m6!3m5!1s0x86456b77cbcefa79:0xcf1db0a8e3bdced7!8m2!3d31.0575554!4d-97.3734765!16s%2Fg%2F11q598fxmn"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-2.5 border-2 border-primary-600 text-primary-600 font-bold rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300"
      >
        Read Our Reviews on Google
      </a>
    </div>
  );
  
  if (!reviews || reviews.length === 0) return (
    <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
      <p className="text-gray-600">No reviews available at this time.</p>
    </div>
  );

  return (
    <div className="space-y-12">
      
      {/* ✅ AI Summary Section (Removed Animation to fix disappearing issue) */}
      {aiSummary && (
        <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100 shadow-sm relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
            <svg className="w-32 h-32 text-primary-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">AI Insights</span>
              <h3 className="text-xl font-bold text-gray-900">What Patients Are Saying</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed italic">
              "{aiSummary}"
            </p>
          </div>
        </div>
      )}

      {/* Review Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, visibleCount).map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={review.profile_photo_url} 
                alt={review.author_name} 
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{review.author_name}</h4>
                <div className="flex text-yellow-400 text-sm">
                  {'★'.repeat(Math.round(review.rating))}
                  <span className="text-gray-300">{'★'.repeat(5 - Math.round(review.rating))}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic mb-4 flex-grow line-clamp-4">"{review.text}"</p>
            <div className="mt-auto text-xs text-gray-400 font-medium">
              {review.relative_time_description}
            </div>
          </div>
        ))}
      </div>

      {visibleCount < reviews.length && (
        <div className="text-center">
          <button 
            onClick={loadMore} 
            className="inline-flex items-center px-8 py-3 border-2 border-primary-600 text-primary-600 font-bold rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}
