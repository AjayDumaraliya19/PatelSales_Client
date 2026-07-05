import React from 'react';

const features = [
  {
    image: '/images/get-the-app/feature-1.png',
    title: 'Find What You Need - Fast!',
    description:
      'Search our full catalog of wholesale food service supplies. Filter by category, brand, or price and find exactly what your business needs.',
  },
  {
    image: '/images/get-the-app/feature-2.png',
    title: 'Ordering Made Easy',
    description:
      'Add items to your cart, apply discounts, and checkout in seconds. Save payment methods and shipping addresses for faster reordering.',
  },
  {
    image: '/images/get-the-app/feature-3.png',
    title: 'Stay in the Loop',
    description:
      'Get push notifications for order updates, flash sales, and new product arrivals. Never miss a deal or delivery again.',
  },
];

export default function GetTheAppFeatures() {
  return (
    <section id="features" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            It&apos;s faster &amp; easier in the app!
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the convenience of ordering wholesale supplies from anywhere
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center group">
              <div className="bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f8] rounded-2xl p-8 mb-6 flex justify-center items-center min-h-[280px] group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto max-h-[200px] object-contain"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#003087] transition-colors">{feature.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
