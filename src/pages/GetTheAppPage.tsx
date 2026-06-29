import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/AppIcon';

export default function GetTheAppPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-[140px]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#003087] to-[#0040a0] py-16">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get the Patel Sales App
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Order wholesale food service supplies on the go. Access our full catalog, track orders, and get exclusive deals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-[#003087] font-bold px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                <Icon name="DevicePhoneMobileIcon" size={24} />
                <div className="text-left">
                  <div className="text-xs opacity-70">Download on the</div>
                  <div className="text-lg">App Store</div>
                </div>
              </button>
              <button className="bg-white text-[#003087] font-bold px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                <Icon name="DevicePhoneMobileIcon" size={24} />
                <div className="text-left">
                  <div className="text-xs opacity-70">Get it on</div>
                  <div className="text-lg">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Why Download Our App?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'ShoppingCartIcon',
                  title: 'Easy Ordering',
                  description: 'Browse and order from our complete catalog of wholesale food service supplies with just a few taps.'
                },
                {
                  icon: 'TruckIcon',
                  title: 'Track Orders',
                  description: 'Real-time order tracking so you always know when your supplies will arrive.'
                },
                {
                  icon: 'BoltIcon',
                  title: 'Exclusive Deals',
                  description: 'Get app-exclusive discounts and flash sales not available anywhere else.'
                },
                {
                  icon: 'BellIcon',
                  title: 'Push Notifications',
                  description: 'Stay informed about new products, price drops, and special promotions.'
                },
                {
                  icon: 'ClockIcon',
                  title: 'Quick Reorder',
                  description: 'Reorder your frequently purchased items with one click.'
                },
                {
                  icon: 'ShieldCheckIcon',
                  title: 'Secure Payments',
                  description: 'Safe and secure payment options including credit cards and net terms.'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-[#003087]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={28} className="text-[#003087]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Experience the Power of Mobile Ordering
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Our mobile app brings the full Patel Sales experience to your fingertips. Whether you're in the office, at the restaurant, or on the go, you can manage your wholesale food service supply orders anytime, anywhere.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Access 10,000+ products',
                    'View detailed product specifications',
                    'Create and manage wishlists',
                    'Multiple payment options',
                    'Order history and invoices',
                    'Customer support integration'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Icon name="CheckIcon" size={14} className="text-white" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-[#e8471e] hover:bg-[#c73a17] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Start Shopping Now
                  <Icon name="ArrowRightIcon" size={20} />
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  {/* Phone Mockup */}
                  <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                      {/* Screen Content */}
                      <div className="absolute top-0 left-0 right-0 h-16 bg-[#003087] flex items-center justify-center">
                        <span className="text-white font-bold">Patel Sales</span>
                      </div>
                      <div className="pt-20 px-4 space-y-3">
                        <div className="h-24 bg-gradient-to-r from-[#003087] to-[#0040a0] rounded-xl" />
                        <div className="grid grid-cols-2 gap-3">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-20 bg-gray-100 rounded-lg" />
                          ))}
                        </div>
                        <div className="h-32 bg-gray-100 rounded-xl" />
                        <div className="h-16 bg-[#e8471e] rounded-xl" />
                      </div>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#e8471e]/20 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#003087]/20 rounded-full blur-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#003087] to-[#0040a0]">
        <div className="w-full px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Download the Patel Sales app today and take your wholesale food service supply ordering to the next level.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-[#003087] font-bold px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                <Icon name="DevicePhoneMobileIcon" size={24} />
                <div className="text-left">
                  <div className="text-xs opacity-70">Download on the</div>
                  <div className="text-lg">App Store</div>
                </div>
              </button>
              <button className="bg-white text-[#003087] font-bold px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                <Icon name="DevicePhoneMobileIcon" size={24} />
                <div className="text-left">
                  <div className="text-xs opacity-70">Get it on</div>
                  <div className="text-lg">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
