import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/AppIcon';
import { actionTiles } from '../../data/homePageData';

export default function ActionTilesSection() {
  return (
    <section className="bg-[#f5f5f5] py-6">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {actionTiles.map((tile) => (
            <Link
              key={tile.title}
              to={tile.href}
              className={`${tile.bgColor} rounded p-5 min-h-[160px] flex flex-col justify-between group hover:opacity-95 transition-opacity`}
            >
              <div>
                <Icon name={tile.icon as any} size={28} className="text-white/70 mb-3" />
                <h3 className="text-white font-bold text-lg leading-tight">{tile.title}</h3>
              </div>
              <span className="text-white/90 text-sm font-semibold group-hover:underline underline-offset-2">
                {tile.subtitle} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
