import React from 'react';
import PhoneMockup, { AppScreenContent } from './PhoneMockup';

export default function GetTheAppRestock() {
  return (
    <section className="bg-gradient-to-r from-[#002244] to-[#003087] py-14 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="relative z-10 w-[180px] h-[340px] bg-gray-900 rounded-[2rem] p-2 shadow-xl">
                <div className="w-full h-full bg-black rounded-[1.6rem]" />
              </div>
              <div className="absolute -right-8 top-8 opacity-60 scale-90 -z-0 hidden sm:block w-[180px] h-[340px] bg-gray-900 rounded-[2rem] p-2 shadow-xl">
                <div className="w-full h-full bg-black rounded-[1.6rem]" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-5">
              Restock all of your essentials with the app
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-8 max-w-lg">
              Quickly reorder foam cups, foil pans, containers, gloves, and more. View order history,
              save favorites, and restock your kitchen supplies with just a few taps.
            </p>
            <button className="bg-[#e8471e] hover:bg-[#c73a17] text-white font-bold text-sm px-6 py-3 rounded-md transition-colors">
              Get the App
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GetTheAppPlus() {
  return (
    <section className="bg-gradient-to-r from-[#003087] to-[#0040a0] py-14 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-bold text-xl">Patel Sales</span>
              <span className="bg-[#e8471e] text-white text-sm font-bold px-2 py-0.5 rounded">Plus</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-5">
              Enjoy Plus on the go
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-8 max-w-lg">
              Get free shipping on qualifying orders, exclusive member discounts, and priority support.
              Manage your Plus membership directly from the app.
            </p>
            <button className="bg-[#e8471e] hover:bg-[#c73a17] text-white font-bold text-sm px-6 py-3 rounded-md transition-colors">
              Sign up for Plus
            </button>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-[180px] h-[340px] bg-gray-900 rounded-[2rem] p-2 shadow-xl">
              <div className="w-full h-full bg-black rounded-[1.6rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
