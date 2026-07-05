import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/AppIcon';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e8f0f8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003087] to-[#0040a0] py-12 md:py-16">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Returns & Exchanges
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Our 30-day return policy for wholesale food service supplies
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-10 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Return Window */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="ClockIcon" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Return Window</h2>
                <p className="text-gray-600 leading-relaxed">
                  We accept returns within 30 days of delivery for most unopened, unused products in original manufacturer packaging. Opened or used food service items cannot be returned for health and safety reasons.
                </p>
              </div>
            </div>
          </div>

          {/* Eligible Items */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2F7D32] to-[#1a5c1e] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="CheckCircleIcon" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Eligible Items</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckIcon" size={16} className="text-[#2F7D32] mt-1 flex-shrink-0" />
                    <span>Unopened cases in original packaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckIcon" size={16} className="text-[#2F7D32] mt-1 flex-shrink-0" />
                    <span>Defective or damaged items (report within 7 days with photos)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckIcon" size={16} className="text-[#2F7D32] mt-1 flex-shrink-0" />
                    <span>Incorrect items shipped (prepaid return label provided)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Non-Returnable Items */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#e8471e] to-[#ff5722] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="XCircleIcon" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Non-Returnable Items</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Icon name="XMarkIcon" size={16} className="text-[#e8471e] mt-1 flex-shrink-0" />
                    <span>Opened food contact items (cups, containers, gloves, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="XMarkIcon" size={16} className="text-[#e8471e] mt-1 flex-shrink-0" />
                    <span>Custom or special-order products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="XMarkIcon" size={16} className="text-[#e8471e] mt-1 flex-shrink-0" />
                    <span>Clearance or final-sale items marked as non-returnable</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How to Start a Return */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#003087] to-[#0040a0] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="ArrowPathIcon" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">How to Start a Return</h2>
                <p className="text-gray-600 leading-relaxed">
                  Contact us at <a href="mailto:info@patelsales.com" className="text-[#003087] hover:text-[#e8471e] font-semibold">info@patelsales.com</a> or <a href="tel:+17327627840" className="text-[#003087] hover:text-[#e8471e] font-semibold">(732) 762-7840</a> with your order number and reason for return. Our team will provide return authorization and instructions. Unauthorized returns may not be accepted.
                </p>
              </div>
            </div>
          </div>

          {/* Refunds */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2F7D32] to-[#1a5c1e] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="CurrencyDollarIcon" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Refunds</h2>
                <p className="text-gray-600 leading-relaxed">
                  Approved returns are refunded to the original payment method within 5–10 business days after we receive and inspect the items. Shipping costs are non-refundable unless the return is due to our error.
                </p>
              </div>
            </div>
          </div>

          {/* Exchanges */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#e8471e] to-[#ff5722] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="ArrowsRightLeftIcon" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Exchanges</h2>
                <p className="text-gray-600 leading-relaxed">
                  Need a different size or product? Contact us within 30 days. Exchanges are subject to product availability. Price differences will be charged or refunded accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#003087] to-[#0040a0] hover:from-[#002244] hover:to-[#003087] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={20} />
            Contact Support
          </Link>
          <Link
            to="/track-order"
            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Icon name="TruckIcon" size={20} />
            Track Order
          </Link>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Last updated: July 1, 2026
        </div>
      </div>
    </div>
  );
}
