import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../ui/AppIcon';
import reviewService, { Review, ReviewStats } from '../../services/reviewService';
import ReviewForm from './ReviewForm';
import { useAuthStore } from '../../store/authStore';

export default function ReviewSection({ productId, productName }: ReviewSectionProps) {
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [filterRating, setFilterRating] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuthStore();

  const fetchStats = useCallback(async () => {
    try {
      const data = await reviewService.getReviewStats(productId);
      setStats(data);
    } catch { /* ignore */ }
  }, [productId]);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 5, sort: sortBy };
      if (filterRating) params.rating = filterRating;
      const data = await reviewService.getProductReviews(productId, params);
      setReviews(data.reviews);
      setTotalPages(data.pages);
    } catch { /* ignore */ }
    setLoading(false);
  }, [productId, page, sortBy, filterRating]);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const handleSubmitReview = async (data: { rating; title; comment }) => {
    await reviewService.createReview(productId, data);
    setShowForm(false);
    setPage(1);
    fetchStats();
    fetchReviews();
  };

  const handleHelpful = async (reviewId) => {
    try {
      const result = await reviewService.markHelpful(reviewId);
      setReviews((prev) => prev.map((r) => (r._id === reviewId ? { ...r, helpful: result.helpful } : r)));
    } catch { /* ignore */ }
  };

  const avgRating = stats?.averageRating || 0;
  const totalReviews = stats?.totalReviews || 0;
  const breakdown = stats?.breakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Customer Reviews</h2>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#003087] text-white text-sm font-bold rounded-lg hover:bg-[#00226b] transition-colors flex items-center gap-1.5"
          >
            <Icon name="PencilIcon" size={15} />
            Write a Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <ReviewForm
          productName={productName}
          onSubmit={handleSubmitReview}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Stats Overview */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
          {/* Average Rating */}
          <div className="text-center md:border-r md:border-gray-200 md:pr-6">
            <div className="text-5xl font-bold text-gray-900">{avgRating}</div>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">{totalReviews} reviews</p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = breakdown[star;
              const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
              return (
                <button
                  key={star}
                  onClick={() => {
                    setFilterRating(filterRating === star ? null : star);
                    setPage(1);
                  }}
                  className={`flex items-center gap-3 w-full group transition-colors rounded px-1 py-0.5 ${
                    filterRating === star ? 'bg-yellow-50' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-600 w-8">{star} ★</span>
                  <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-16 text-right">{count} ({pct}%)</span>
                </button>
              );
            })}
            {filterRating && (
              <button
                onClick={() => { setFilterRating(null); setPage(1); }}
                className="text-xs text-[#003087] font-semibold hover:underline mt-1"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 font-medium">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] outline-none"
        >
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
          <option value="-rating">Highest Rated</option>
          <option value="rating">Lowest Rated</option>
          <option value="-helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="space-y-1.5">
                  <div className="h-3 bg-gray-200 rounded w-24" />
                  <div className="h-2 bg-gray-200 rounded w-16" />
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10 bg-white border border-gray-200 rounded-xl">
          <Icon name="ChatBubbleLeftEllipsisIcon" size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">
            {filterRating ? `No ${filterRating}-star reviews yet.` : 'No reviews yet. Be the first to review this product!'}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#003087] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {review.user?.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-900">{review.user?.name || 'Anonymous'}</span>
                      {review.isVerifiedPurchase && (
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Icon name="CheckBadgeIcon" size={10} />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-3.5 h-3.5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    {review.title && <p className="text-sm font-bold text-gray-900 mt-2">{review.title}</p>}
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{review.comment}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {review.images.map((img, idx) => (
                          <div key={idx} className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden">
                            <img src={img} alt="Review" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => handleHelpful(review._id)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#003087] transition-colors"
                      >
                        <Icon name="HandThumbUpIcon" size={14} />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
