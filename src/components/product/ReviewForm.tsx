import React, { useState } from 'react';
import Icon from '../ui/AppIcon';

interface ReviewFormProps {
  productName: string;
  onSubmit: (data: { rating: number; title: string; comment: string }) => Promise<void>;
  onCancel: () => void;
}

export default function ReviewForm({ productName, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const displayRating = hoverRating || rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating');
      return;
    }
    if (!comment.trim()) {
      setError('Please write your review');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onSubmit({ rating, title: title.trim(), comment: comment.trim() });
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">Write a Review</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-1" aria-label="Close">
          <Icon name="XMarkIcon" size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-5">Share your experience with <span className="font-semibold text-gray-700">{productName}</span></p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-4 flex items-center gap-2">
          <Icon name="ExclamationCircleIcon" size={16} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Overall Rating *</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5 transition-transform hover:scale-110"
                aria-label={`Rate ${star} stars`}
              >
                <svg
                  className={`w-8 h-8 transition-colors ${
                    star <= displayRating ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            {displayRating > 0 && (
              <span className="ml-2 text-sm text-gray-500">
                {displayRating === 1 && 'Poor'}
                {displayRating === 2 && 'Fair'}
                {displayRating === 3 && 'Good'}
                {displayRating === 4 && 'Very Good'}
                {displayRating === 5 && 'Excellent'}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Review Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sum up your experience in a few words"
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Review *</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike? How was the quality? Would you recommend it?"
            rows={4}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] outline-none transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-[#003087] text-white text-sm font-bold rounded-lg hover:bg-[#00226b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[40px]"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
