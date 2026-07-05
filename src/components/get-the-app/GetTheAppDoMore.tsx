import React from 'react';
import Icon from '../ui/AppIcon';

const doMoreFeatures = [
  {
    icon: 'ArrowPathIcon',
    title: 'Reorder your favorites',
    description: 'Quickly reorder items from your purchase history with one tap.',
    color: 'from-[#2F7D32] to-[#1a5c1e]',
  },
  {
    icon: 'CubeTransparentIcon',
    title: 'See it in your space',
    description: 'Visualize products in your kitchen or storage area before buying. (iOS only)',
    color: 'from-[#e8471e] to-[#ff5722]',
  },
  {
    icon: 'ClipboardDocumentListIcon',
    title: 'Organize with lists',
    description: 'Create custom shopping lists for different locations or departments.',
    color: 'from-[#003087] to-[#0040a0]',
  },
  {
    icon: 'TruckIcon',
    title: 'Order tracking',
    description: 'Track your orders in real time from warehouse to your door.',
    color: 'from-[#2F7D32] to-[#1a5c1e]',
  },
  {
    icon: 'SparklesIcon',
    title: 'More coming soon',
    description: 'We are constantly adding new features to make ordering even easier.',
    color: 'from-[#e8471e] to-[#ff5722]',
  },
];

export default function GetTheAppDoMore() {
  return (
    <section className="bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f8] py-16 lg:py-24">
      <div className="max-w-7xl md:max-w-5xl lg:max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Do more with the app
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Powerful features designed to streamline your wholesale ordering
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doMoreFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 text-center"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <Icon name={feature.icon as any} size={28} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#003087] transition-colors">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
