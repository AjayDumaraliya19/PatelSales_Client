import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/AppIcon';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#003087] to-[#0040a0] py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Patel Sales LLC
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Your Trusted Partner for Premium Food Packaging & Disposable Supplies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-[#003087] font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Shop Products
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 rounded-2xl h-[400px] flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <Icon name="BuildingOffice2Icon" size={64} />
                <p className="mt-4">Warehouse Image</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Patel Sales LLC is a trusted supplier of food packaging products and disposable supplies.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We help restaurants, cafés, hotels, grocery stores, food trucks, bakeries, catering businesses, wholesalers and retailers by providing high-quality packaging solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-[#2F7D32]" />
                  <span className="text-gray-700 font-medium">Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-[#2F7D32]" />
                  <span className="text-gray-700 font-medium">Affordable Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-[#2F7D32]" />
                  <span className="text-gray-700 font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-[#2F7D32]" />
                  <span className="text-gray-700 font-medium">Reliable Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-[#2F7D32]" />
                  <span className="text-gray-700 font-medium">Large Inventory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We are dedicated to providing premium quality packaging products while supporting food businesses with affordable prices and excellent customer service.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: 'StarIcon', title: 'Premium Quality' },
              { icon: 'BuildingStorefrontIcon', title: 'Support Businesses' },
              { icon: 'CurrencyDollarIcon', title: 'Affordable Prices' },
              { icon: 'HeartIcon', title: 'Customer Service' },
              { icon: 'LeafIcon', title: 'Eco-Friendly' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-[#2F7D32]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as any} size={32} className="text-[#2F7D32]" />
                </div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the advantages of partnering with Patel Sales LLC for your packaging needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ShieldCheckIcon', title: 'Premium Quality', desc: 'Only the best products for your business' },
              { icon: 'TagIcon', title: 'Competitive Pricing', desc: 'Affordable rates without compromising quality' },
              { icon: 'TruckIcon', title: 'Fast Shipping', desc: 'Quick delivery to your doorstep' },
              { icon: 'CubeIcon', title: 'Bulk Orders', desc: 'Special pricing for large quantities' },
              { icon: 'FaceSmileIcon', title: 'Customer Satisfaction', desc: 'Your happiness is our priority' },
              { icon: 'BuildingIcon', title: 'Trusted Supplier', desc: 'Reliable partner for your business' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:bg-[#2F7D32]/5 hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 bg-[#003087] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#2F7D32] transition-colors">
                  <Icon name={item.icon as any} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Product Categories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our wide range of food packaging and disposable products
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Portion Cups & Lids',
              'Plastic Containers',
              'Paper Napkins',
              'Paper Towels',
              'Paper Bags',
              'Foil Products',
              'Disposable Plastic Cups',
              'Take-Out Containers',
            ].map((category, index) => (
              <Link
                key={index}
                to="/products"
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center group-hover:bg-[#2F7D32]/10 transition-colors">
                  <Icon name="CubeIcon" size={40} className="text-gray-400 group-hover:text-[#2F7D32] transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{category}</h3>
                <p className="text-sm text-gray-500 mb-4">Quality packaging solutions</p>
                <span className="text-[#003087] font-semibold text-sm group-hover:text-[#2F7D32] transition-colors">
                  Shop Now →
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#003087] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#002266] transition-colors"
            >
              View All Categories
              <Icon name="ArrowRightIcon" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Trusted by businesses across various industries
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              'Restaurants',
              'Hotels',
              'Food Trucks',
              'Cafes',
              'Catering Services',
              'Hospitals',
              'Schools',
              'Corporate Offices',
              'Supermarkets',
              'Wholesale Distributors',
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl text-center hover:bg-[#003087]/5 transition-colors"
              >
                <div className="w-12 h-12 bg-[#003087] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="BuildingOfficeIcon" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-[#2F7D32] to-[#1a5c1e]">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Commitment to Sustainability
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-12">
              We are dedicated to protecting the environment through eco-friendly packaging solutions
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: 'ArrowPathIcon', title: 'Reusable Packaging' },
                { icon: 'RecycleIcon', title: 'Recyclable Materials' },
                { icon: 'LeafIcon', title: 'Compostable Products' },
                { icon: 'GlobeAmericasIcon', title: 'Protecting Environment' },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <Icon name={item.icon as any} size={40} className="text-white mb-3" />
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From sourcing to delivery, we ensure quality at every step
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { step: '1', title: 'Product Sourcing' },
              { step: '2', title: 'Quality Inspection' },
              { step: '3', title: 'Warehouse Storage' },
              { step: '4', title: 'Fast Packaging' },
              { step: '5', title: 'Doorstep Delivery' },
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#003087] rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                </div>
                {index < 4 && (
                  <div className="hidden md:block text-[#2F7D32]">
                    <Icon name="ChevronDownIcon" size={24} className="md:rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Company Statistics */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { value: '5000+', label: 'Products' },
              { value: '1000+', label: 'Happy Customers' },
              { value: '50+', label: 'Trusted Brands' },
              { value: '10+', label: 'Years Experience' },
              { value: '100%', label: 'Quality Assurance' },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-xl text-center shadow-sm">
                <div className="text-4xl md:text-5xl font-bold text-[#003087] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Promise */}
      <section className="py-16 lg:py-24 bg-[#003087]">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Commitment
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            We are committed to providing premium disposable food packaging products with exceptional customer service, competitive pricing, and fast nationwide delivery.
          </p>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Order Quality Food Packaging?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-[#003087] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#002266] transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
              className="bg-[#2F7D32] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#1a5c1e] transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
