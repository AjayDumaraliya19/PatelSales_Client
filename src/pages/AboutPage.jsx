import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/AppIcon';
import { getCategoryProductHref } from '../data/productCategories';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const CountUpAnimation = ({ value, duration = 2000 }: { value; duration? }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
    const suffix = value.replace(/[\d]/g, '');

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * numericValue));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, numericValue, duration]);

    return <span>{count}{suffix}</span>;
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="absolute inset-0">
          <img
            src="/images/about/background.png"
            alt="About Patel Sales LLC"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003087]/50 to-[#0040a0]/40" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            About Patel Sales LLC
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
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
      <section className="py-8 sm:py-10 lg:py-16 bg-white">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/about/ware-house.png"
                alt="Patel Sales Warehouse"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Who We Are
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                Patel Sales LLC is a trusted supplier of food packaging products and disposable supplies.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
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

      {/* What Makes Us Great */}
      <section className="py-8 sm:py-10 lg:py-16 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Makes Us Great?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the advantages of choosing Patel Sales LLC
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: 'TruckIcon',
                title: 'Fast Shipping',
                desc: 'For more details about shipping from each of our warehouse locations check out the Ground and Common Carrier estimated shipping times to your area.',
              },
              {
                icon: 'CurrencyDollarIcon',
                title: 'Low Prices',
                desc: 'We have hundreds of thousands of products on our website and add more every day. Our large volume of inventory means we get to offer you exceptionally low prices.',
              },
              {
                icon: 'DocumentTextIcon',
                title: 'High Quality Content',
                desc: 'We provide you with the relevant info you need to make the right purchasing decisions. Every one of our product descriptions is written by a dedicated content writer.',
              },
              {
                icon: 'HeadsetIcon',
                title: 'Customer Support',
                desc: 'Our friendly, knowledgeable Customer Solutions Specialists are here to assist with your questions and concerns. Contact us for a quick, simple solution.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group text-center"
              >
                {/* Icon/Image Section - 20% */}
                <div className="h-32 bg-gradient-to-br from-[#003087] to-[#0040a0] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Icon name={item.icon} size={48} className="text-white" />
                </div>
                {/* Content Section - 80% */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-8 sm:py-10 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about/our-mission.png"
            alt="Our Mission"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#003087]/80 to-[#0040a0]/50" />
        </div>

        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              We are dedicated to providing premium quality packaging products while supporting food businesses with affordable prices and excellent customer service.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { icon: 'StarIcon', title: 'Premium Quality', desc: 'Top-tier products' },
              { icon: 'BuildingStorefrontIcon', title: 'Support Businesses', desc: 'Your growth partner' },
              { icon: 'CurrencyDollarIcon', title: 'Affordable Prices', desc: 'Best value guaranteed' },
              { icon: 'HeartIcon', title: 'Customer Service', desc: '24/7 dedicated support' },
              { icon: 'LeafIcon', title: 'Eco-Friendly', desc: 'Sustainable solutions' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <Icon name={item.icon} size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">{item.title}</h3>
                <p className="text-white/80 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 sm:py-10 lg:py-16 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the advantages of partnering with Patel Sales LLC for your packaging needs
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon name={item.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#003087] transition-colors">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-8 sm:py-10 lg:py-16 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Product Categories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our wide range of food packaging and disposable products
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Portion Cups & Lids', slug: 'portion-cups-and-lids', image: 'portion-cups-and-lids.png' },
              { name: 'Plastic Containers', slug: 'plastic-containers', image: 'plastic-containers.png' },
              { name: 'Paper Napkins', slug: 'paper-napkins-and-towels', image: 'paper-napkins-and-towels.png' },
              { name: 'Paper Towels', slug: 'paper-napkins-and-towels', image: 'paper-napkins-and-towels.png' },
              { name: 'Paper Bags', slug: 'paper-bags', image: 'paper-bags.png' },
              { name: 'Foil Products', slug: 'foil-products', image: 'foil-products.png' },
              { name: 'Disposable Plastic Cups', slug: 'disposable-plastic-cups', image: 'disposable-plastic-cups.png' },
              { name: 'Take-Out Containers', slug: 'foam-containers', image: 'foam-containers.png' },
            ].map((category, index) => (
              <Link
                key={index}
                to={getCategoryProductHref(category.slug)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <div className="relative rounded-lg h-32 mb-4 overflow-hidden bg-gray-100">
                  <img
                    src={`/images/categories/${category.image}`}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2 text-center">{category.name}</h3>
                <p className="text-sm text-gray-500 mb-4 text-center">Quality packaging solutions</p>
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

      {/* Sustainability */}
      <section className="py-8 sm:py-10 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about/commitement.png"
            alt="Sustainability"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2F7D32]/60 to-[#1a5c1e]/50" />
        </div>

        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 relative z-10">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Our Commitment to Sustainability
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              We are dedicated to protecting the environment through eco-friendly packaging solutions
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: 'ArrowPathIcon', title: 'Reusable Packaging', desc: 'Reduce waste with reusable options' },
              { icon: 'ArchiveBoxIcon', title: 'Recyclable Materials', desc: 'Made from recycled content' },
              { icon: 'SproutIcon', title: 'Compostable Products', desc: 'Biodegradable packaging solutions' },
              { icon: 'GlobeAmericasIcon', title: 'Protecting Environment', desc: 'Eco-conscious business practices' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/15 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/25 hover:scale-105 transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <Icon name={item.icon} size={36} className="text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Statistics */}
      <section ref={sectionRef} className="py-8 sm:py-10 lg:py-16 bg-white">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Our Numbers Speak
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Trusted by thousands of businesses across the nation
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {[
              { value: '5000+', label: 'Products', icon: 'CubeIcon' },
              { value: '1000+', label: 'Happy Customers', icon: 'UserGroupIcon' },
              { value: '50+', label: 'Trusted Brands', icon: 'BuildingStorefrontIcon' },
              { value: '10+', label: 'Years Experience', icon: 'CalendarIcon' },
              { value: '100%', label: 'Quality Assurance', icon: 'ShieldCheckIcon' },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon name={stat.icon} size={28} className="text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#003087] mb-2">
                  <CountUpAnimation value={stat.value} />
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-8 sm:py-10 lg:py-16 bg-white">
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
