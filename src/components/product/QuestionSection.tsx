import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../ui/AppIcon';
import questionService, { Question } from '../../services/questionService';
import { useAuthStore } from '../../store/authStore';

interface QuestionSectionProps {
  productId: string;
}

export default function QuestionSection({ productId }: QuestionSectionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuthStore();

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await questionService.getProductQuestions(productId, { page, limit: 5 });
      setQuestions(data.questions);
      setTotalPages(data.pages);
    } catch { /* ignore */ }
    setLoading(false);
  }, [productId, page]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) {
      setError('Please enter your question');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await questionService.askQuestion(productId, newQuestion.trim());
      setNewQuestion('');
      setShowForm(false);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit question');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Questions & Answers</h2>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-white border-2 border-[#003087] text-[#003087] text-sm font-bold rounded-lg hover:bg-[#003087]/5 transition-colors flex items-center gap-1.5"
          >
            <Icon name="QuestionMarkCircleIcon" size={15} />
            Ask a Question
          </button>
        )}
      </div>

      {submitted && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <Icon name="CheckCircleIcon" size={16} />
          Your question has been submitted. It will be visible once answered by our team.
          <button onClick={() => setSubmitted(false)} className="ml-auto text-green-600 hover:text-green-800">
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleAskQuestion} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Ask a Question about this product</h3>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg mb-3 flex items-center gap-1.5">
              <Icon name="ExclamationCircleIcon" size={14} />
              {error}
            </div>
          )}
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here..."
            rows={3}
            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#003087]/20 focus:border-[#003087] outline-none resize-none"
          />
          <div className="flex items-center gap-3 mt-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-[#003087] text-white text-sm font-bold rounded-lg hover:bg-[#00226b] disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Question'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm font-semibold text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-white border border-gray-200 rounded-xl p-5">
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-full mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-8 bg-white border border-gray-200 rounded-xl">
          <Icon name="QuestionMarkCircleIcon" size={36} className="mx-auto text-gray-300 mb-2" />
          <p className="text-sm text-gray-500">No questions yet. {user ? 'Be the first to ask!' : 'Login to ask a question.'}</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {questions.map((q) => (
              <div key={q._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-5 py-3 bg-blue-50/50 border-b border-gray-100">
                  <div className="flex items-start gap-2">
                    <span className="text-[#003087] font-bold text-sm mt-0.5">Q:</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{q.question}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Asked by {q.user?.name || 'Anonymous'} · {new Date(q.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                {q.answer && (
                  <div className="px-5 py-3">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 font-bold text-sm mt-0.5">A:</span>
                      <div>
                        <p className="text-sm text-gray-700 leading-relaxed">{q.answer}</p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Answered by {q.answeredBy?.name || 'Patel Sales Team'} · {q.updatedAt ? new Date(q.updatedAt).toLocaleDateString() : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40"
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
