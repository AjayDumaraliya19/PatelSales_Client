import React from 'react';
import Icon from '../ui/AppIcon';

const doMoreFeatures = [
  {
    icon: 'CameraIcon',
    title: 'Search with your camera',
    description: 'Snap a photo to find matching products in our catalog instantly.',
  },
  {
    icon: 'ArrowPathIcon',
    title: 'Reorder your favorites',
    description: 'Quickly reorder items from your purchase history with one tap.',
  },
  {
    icon: 'CubeTransparentIcon',
    title: 'See it in your space',
    description: 'Visualize products in your kitchen or storage area before buying. (iOS only)',
  },
  {
    icon: 'ClipboardDocumentListIcon',
    title: 'Organize with lists',
    description: 'Create custom shopping lists for different locations or departments.',
  },
  {
    icon: 'TruckIcon',
    title: 'Order tracking',
    description: 'Track your orders in real time from warehouse to your door.',
  },
  {
    icon: 'SparklesIcon',
    title: 'More coming soon',
    description: 'We are constantly adding new features to make ordering even easier.',
  },
];

export default function GetTheAppDoMore() {
  return (
    <section className="bg-[#eef5f0] py-14 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-12 lg:mb-16">
          Do more with the app
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doMoreFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 mb-4">
                <Icon name={feature.icon as any} size={28} className="text-[#003087]" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
