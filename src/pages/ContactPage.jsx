import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import ContactForm from '../components/contact/ContactForm';
import Icon from '../components/ui/AppIcon';
import { contactFaqs, contactInfo } from '../data/contactPageData';

const contactCards = [
  {
    icon: 'PhoneIcon',
    title: 'Call Us',
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
    sub: 'Mon–Sat during business hours',
  },
  {
    icon: 'EnvelopeIcon',
    title: 'Email Us',
    value: contactInfo.email,
    href: contactInfo.emailHref,
    sub: 'We reply within 1 business day',
  },
  {
    icon: 'MapPinIcon',
    title: 'Visit Us',
    value: contactInfo.address.line1,
    sub: contactInfo.address.line2,
  },
  {
    icon: 'ClockIcon',
    title: 'Business Hours',
    value: contactInfo.hours[0].time,
    sub: `${contactInfo.hours[0].days} · Sat 8am–4pm`,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-full bg-[var(--background)]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003087] via-[#0040a0] to-[#0050b8] py-16 lg:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Contact Patel Sales</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Questions about wholesale pricing, bulk orders, or product availability? Our New Jersey team is here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pt-8 pb-12 lg:pt-12 lg:pb-16">
        <PageHeader
          title="Get in Touch"
          breadcrumbs={[
            { label: 'Patel Sales', href: '/' },
            { label: 'Contact Us' },
          ]}
        />

        {/* Quick contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {contactCards.map((card) => (
            <div key={card.title} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Icon name={card.icon} size={24} className="text-white" />
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{card.title}</p>
              {card.href ? (
                <a href={card.href} className="text-base font-bold text-gray-900 hover:text-[#003087] transition-colors mb-2">
                  {card.value}
                </a>
              ) : (
                <p className="text-base font-bold text-gray-900 mb-2">{card.value}</p>
              )}
              <p className="text-sm text-gray-600 leading-relaxed">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hours detail */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-lg flex items-center justify-center">
                  <Icon name="ClockIcon" size={20} className="text-white" />
                </div>
                Store Hours
              </h3>
              <ul className="space-y-3">
                {contactInfo.hours.map((slot) => (
                  <li key={slot.days} className="flex justify-between gap-3 text-sm py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600 font-medium">{slot.days}</span>
                    <span className="font-semibold text-gray-900 shrink-0">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Help</h3>
              <div className="space-y-2">
                <Link to="/track-order" className="flex items-center gap-3 text-sm text-gray-700 font-semibold hover:text-[#003087] hover:bg-gray-50 p-3 rounded-xl transition-all duration-200">
                  <Icon name="TruckIcon" size={18} className="text-[#003087]" />
                  Track Your Order
                </Link>
                <Link to="/business-accounts" className="flex items-center gap-3 text-sm text-gray-700 font-semibold hover:text-[#003087] hover:bg-gray-50 p-3 rounded-xl transition-all duration-200">
                  <Icon name="UserPlusIcon" size={18} className="text-[#003087]" />
                  Create Business Account
                </Link>
                <Link to="/shipping" className="flex items-center gap-3 text-sm text-gray-700 font-semibold hover:text-[#003087] hover:bg-gray-50 p-3 rounded-xl transition-all duration-200">
                  <Icon name="TruckIcon" size={18} className="text-[#003087]" />
                  Shipping Information
                </Link>
                <Link to="/returns" className="flex items-center gap-3 text-sm text-gray-700 font-semibold hover:text-[#003087] hover:bg-gray-50 p-3 rounded-xl transition-all duration-200">
                  <Icon name="ArrowPathIcon" size={18} className="text-[#003087]" />
                  Returns & Exchanges
                </Link>
                <Link to="/faq" className="flex items-center gap-3 text-sm text-gray-700 font-semibold hover:text-[#003087] hover:bg-gray-50 p-3 rounded-xl transition-all duration-200">
                  <Icon name="QuestionMarkCircleIcon" size={18} className="text-[#003087]" />
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full width map section */}
        <section className="mt-8 lg:mt-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-lg flex items-center justify-center">
                  <Icon name="MapPinIcon" size={20} className="text-white" />
                </div>
                Our Location
              </h3>
            </div>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2!2d-74.2!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40LjQ3NzQ!5e0!3m2!1sen!2sus!4v1234567890&q=${encodeURIComponent(contactInfo.address.full)}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Patel Sales Location"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12 lg:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {contactFaqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
