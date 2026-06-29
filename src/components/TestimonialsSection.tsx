import React, { useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Marco Rossi',
    role: 'Owner, Rossi\'s Deli',
    location: 'New Brunswick, NJ',
    rating: 5,
    text: 'Patel Sales has been our go-to supplier for over 2 years. The foam cups and foil pans are always in stock and the prices beat everyone else in the area. Delivery is fast too!',
    initials: 'MR',
  },
  {
    id: 2,
    name: 'Sarah Kim',
    role: 'Manager, Kim\'s Bakery',
    location: 'Edison, NJ',
    rating: 5,
    text: 'We switched from a big box store to Patel Sales and cut our packaging costs by 30%. The eco-friendly containers are perfect for our brand and customers love them.',
    initials: 'SK',
  },
  {
    id: 3,
    name: 'James Patel',
    role: 'Chef/Owner, Spice Garden',
    location: 'Piscataway, NJ',
    rating: 5,
    text: 'Same-day pickup is a lifesaver when we run out of supplies mid-week. The staff is knowledgeable and always helps me find the right size containers for my dishes.',
    initials: 'JP',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>('.review-card');
            cards.forEach((card, i) => {
              card.style.transition = `opacity 0.4s ease ${i * 100}ms, transform 0.4s ease ${i * 100}ms`;
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 px-4 bg-[#f5f5f5]">
      <div className="w-full">
        {/* Section header */}
        <div className="wss-section-header mb-5">
          What Our Customers Say
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials?.map((review) => (
            <div
              key={review?.id}
              className="review-card bg-white border border-gray-200 p-5 rounded-sm opacity-0"
              style={{ transform: 'translateY(8px)' }}
            >
              {/* Stars */}
              <div className="flex wss-stars mb-3">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <span key={star}>{star <= review?.rating ? '\u2605' : '\u2606'}</span>
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                &ldquo;{review?.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-9 h-9 bg-[#003087] rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{review?.initials}</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">{review?.name}</div>
                  <div className="text-xs text-gray-500">{review?.role}</div>
                  <div className="text-xs text-[#003087]">{review?.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-6 bg-white border border-gray-200 rounded-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-[#003087]">4.9</div>
            <div>
              <div className="flex wss-stars text-xl mb-1">
                {'\u2605\u2605\u2605\u2605\u2605'}
              </div>
              <div className="text-sm text-gray-600">Based on 500+ reviews</div>
              <div className="text-xs text-gray-400">from verified business customers</div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 w-full sm:w-64">
            {[
              { stars: 5, pct: 87 },
              { stars: 4, pct: 9 },
              { stars: 3, pct: 3 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 0 },
            ]?.map((row) => (
              <div key={row?.stars} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-8">{row?.stars}★</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[#f5a623] h-2 rounded-full"
                    style={{ width: `${row?.pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8">{row?.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
