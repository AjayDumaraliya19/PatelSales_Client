import React from 'react';
import Icon from '../ui/AppIcon';

export default function TrustBadgesSection({ badges = [] }) {
  if (!badges || badges.length === 0) return null;

  return (
    <section className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 rounded-full bg-[#003087]/5 flex items-center justify-center text-[#003087]">
                <Icon name="CheckBadgeIcon" size={20} />
              </div>
              <span className="font-semibold text-sm md:text-base">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
