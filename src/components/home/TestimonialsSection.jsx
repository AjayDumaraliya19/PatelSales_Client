import React from 'react';
import AppImage from '../ui/AppImage';

export default function TestimonialsSection({ title = "What Our Customers Say", testimonials = [] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 flex-grow italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-[#003087]/10 rounded-full flex items-center justify-center text-[#003087] font-bold text-xl uppercase">
                  {testimonial.customerName?.charAt(0) || 'C'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.customerName}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
