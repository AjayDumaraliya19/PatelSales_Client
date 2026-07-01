import React from 'react';
import { AppScreenContent } from './PhoneMockup';

const features = [
  {
    type: 'search' as const,
    title: 'Find What You Need - Fast!',
    description:
      'Search our full catalog of wholesale food service supplies. Filter by category, brand, or price and find exactly what your business needs.',
  },
  {
    type: 'checkout' as const,
    title: 'Ordering Made Easy',
    description:
      'Add items to your cart, apply discounts, and checkout in seconds. Save payment methods and shipping addresses for faster reordering.',
  },
  {
    type: 'notifications' as const,
    title: 'Stay in the Loop',
    description:
      'Get push notifications for order updates, flash sales, and new product arrivals. Never miss a deal or delivery again.',
  },
];

export default function GetTheAppFeatures() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-12 lg:mb-16">
          It&apos;s faster &amp; easier in the app!
        </h2>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="bg-[#e8f0fa] rounded-2xl p-6 mb-6 flex justify-center min-h-[280px] items-center">
                <div className="w-[180px] h-[340px] bg-gray-900 rounded-[2rem] p-2 shadow-xl">
                  <div className="w-full h-full bg-black rounded-[1.6rem]" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
