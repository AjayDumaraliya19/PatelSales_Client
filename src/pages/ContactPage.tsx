import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import ContactForm from '../components/contact/ContactForm';
import Icon from '../components/ui/AppIcon';
import { contactFaqs, contactInfo } from '../data/contactPageData';

const contactCards = [
  {
    icon: 'PhoneIcon' as const,
    title: 'Call Us',
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
    sub: 'Mon–Sat during business hours',
  },
  {
    icon: 'EnvelopeIcon' as const,
    title: 'Email Us',
    value: contactInfo.email,
    href: contactInfo.emailHref,
    sub: 'We reply within 1 business day',
  },
  {
    icon: 'MapPinIcon' as const,
    title: 'Visit Us',
    value: contactInfo.address.line1,
    sub: contactInfo.address.line2,
  },
  {
    icon: 'ClockIcon' as const,
    title: 'Business Hours',
    value: contactInfo.hours[0].time,
    sub: `${contactInfo.hours[0].days} · Sat 8am–4pm`,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-full bg-[var(--background)]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[var(--secondary)] to-[#0040a0] py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Contact Patel Sales</h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            Questions about wholesale pricing, bulk orders, or product availability? Our New Jersey team is here to help.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-8 sm:pt-8 sm:pb-10">
        <PageHeader
          title="Get in Touch"
          breadcrumbs={[
            { label: 'Patel Sales', href: '/' },
            { label: 'Contact Us' },
          ]}
        />

        {/* Quick contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {contactCards.map((card) => (
            <div key={card.title} className="app-card p-4 sm:p-5 flex flex-col">
              <div className="w-10 h-10 bg-[var(--secondary)]/10 rounded-lg flex items-center justify-center mb-3">
                <Icon name={card.icon} size={20} className="text-[var(--secondary)]" />
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{card.title}</p>
              {card.href ? (
                <a href={card.href} className="text-sm font-bold text-gray-900 hover:text-[var(--secondary)] transition-colors">
                  {card.value}
                </a>
              ) : (
                <p className="text-sm font-bold text-gray-900">{card.value}</p>
              )}
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Hours detail */}
            <div className="app-card p-4 sm:p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icon name="ClockIcon" size={18} className="text-[var(--secondary)]" />
                Store Hours
              </h3>
              <ul className="space-y-2">
                {contactInfo.hours.map((slot) => (
                  <li key={slot.days} className="flex justify-between gap-3 text-sm">
                    <span className="text-gray-600">{slot.days}</span>
                    <span className="font-semibold text-gray-900 shrink-0">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="app-card p-4 sm:p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Help</h3>
              <div className="space-y-2">
                <Link to="/track-order" className="flex items-center gap-2 text-sm text-[var(--secondary)] font-semibold hover:underline min-h-[44px]">
                  <Icon name="TruckIcon" size={16} />
                  Track Your Order
                </Link>
                <Link to="/business-accounts" className="flex items-center gap-2 text-sm text-[var(--secondary)] font-semibold hover:underline min-h-[44px]">
                  <Icon name="UserPlusIcon" size={16} />
                  Create Business Account
                </Link>
                <Link to="/shipping" className="flex items-center gap-2 text-sm text-[var(--secondary)] font-semibold hover:underline min-h-[44px]">
                  <Icon name="TruckIcon" size={16} />
                  Shipping Information
                </Link>
                <Link to="/returns" className="flex items-center gap-2 text-sm text-[var(--secondary)] font-semibold hover:underline min-h-[44px]">
                  <Icon name="ArrowPathIcon" size={16} />
                  Returns & Exchanges
                </Link>
                <Link to="/faq" className="flex items-center gap-2 text-sm text-[var(--secondary)] font-semibold hover:underline min-h-[44px]">
                  <Icon name="QuestionMarkCircleIcon" size={16} />
                  FAQ
                </Link>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="app-card overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="MapPinIcon" size={18} className="text-[var(--secondary)]" />
                  Our Location
                </h3>
              </div>
              <div className="aspect-[4/3] bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
                <Icon name="MapIcon" size={40} className="text-gray-300 mb-2" />
                <p className="text-sm font-semibold text-gray-700">{contactInfo.address.line1}</p>
                <p className="text-sm text-gray-500">{contactInfo.address.line2}</p>
                <Link to="/location" className="btn-outline mt-4 min-h-[44px] text-sm inline-flex">
                  View Location Details
                </Link>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-2 min-h-[44px] text-sm inline-flex"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {contactFaqs.map((faq) => (
              <div key={faq.question} className="app-card p-4 sm:p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
