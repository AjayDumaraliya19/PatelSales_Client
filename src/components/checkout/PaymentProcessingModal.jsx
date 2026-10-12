import React from 'react';
import Icon from '../ui/AppIcon';

export default function PaymentProcessingModal({
  isOpen,
  status = 'processing', // 'processing' | 'failed' | 'success'
  step = 2, // 1 to 4
  errorMessage = '',
  amount = 0,
  orderNumber = '',
  onTryAgain,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-center p-6 sm:p-8 transform transition-all animate-fadeIn"
        role="dialog"
        aria-modal="true"
      >
        {/* ===================== STATE 1: PROCESSING ===================== */}
        {status === 'processing' && (
          <div className="space-y-5">
            {/* Pulsing Security Shield & Spinning Ring */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
              <div className="absolute inset-1 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin" />
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                <Icon name="ShieldCheckIcon" size={34} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                Processing Payment Securely
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Please wait while we communicate with Stripe & your bank.
              </p>
            </div>

            {/* Total Amount Badge */}
            <div className="py-2.5 px-4 bg-slate-50 border border-slate-200/80 rounded-xl inline-flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-500">Transaction Amount:</span>
              <span className="font-extrabold text-gray-900 text-base">
                ${Number(amount || 0).toFixed(2)}
              </span>
            </div>

            {/* Live Progress Steps */}
            <div className="text-left space-y-2.5 bg-gray-50/70 p-3.5 rounded-xl border border-gray-100 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Icon name="CheckIcon" size={13} />
                </span>
                <span className="text-gray-700 font-medium">Validating Order & Delivery Info</span>
              </div>

              <div className="flex items-center gap-2.5">
                {step >= 2 ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Icon name="CheckIcon" size={13} />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin shrink-0" />
                )}
                <span className={step >= 2 ? 'text-gray-700 font-medium' : 'text-emerald-700 font-semibold'}>
                  Connecting to Stripe Payment Gateway
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {step >= 3 ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Icon name="CheckIcon" size={13} />
                  </span>
                ) : step === 2 ? (
                  <span className="w-5 h-5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-gray-200 shrink-0" />
                )}
                <span className={step === 2 ? 'text-emerald-700 font-semibold' : step >= 3 ? 'text-gray-700 font-medium' : 'text-gray-400'}>
                  Authorizing Card & 3D Secure Protection
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {step >= 4 ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Icon name="CheckIcon" size={13} />
                  </span>
                ) : step === 3 ? (
                  <span className="w-5 h-5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-gray-200 shrink-0" />
                )}
                <span className={step === 3 ? 'text-emerald-700 font-semibold' : 'text-gray-400'}>
                  Confirming Order & Generating Receipt
                </span>
              </div>
            </div>

            {/* Critical Warning Notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left flex items-start gap-2.5 text-amber-900 text-[11px]">
              <Icon name="ExclamationTriangleIcon" size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Do not refresh or go back</span>
                Your card is being authorized. Closing this window may interrupt payment verification.
              </div>
            </div>
          </div>
        )}

        {/* ===================== STATE 2: FAILED ===================== */}
        {status === 'failed' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Animated Failure Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-inner">
              <Icon name="XCircleIcon" size={44} variant="solid" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                Payment Unsuccessful
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Your payment could not be completed by Stripe.
              </p>
            </div>

            {/* Error Message Box */}
            <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl text-left space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-800">
                <Icon name="ExclamationCircleIcon" size={16} className="text-red-600 shrink-0" />
                <span>Reason for decline:</span>
              </div>
              <p className="text-xs text-red-700 font-medium pl-5 leading-relaxed">
                {errorMessage || 'Your card was declined. Please verify your card number, expiration date, and CVC, or try another card.'}
              </p>
              <p className="text-[11px] text-gray-500 pl-5 pt-1">
                Note: Your bank account has <span className="font-semibold text-gray-700">not</span> been charged for this attempt.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={onTryAgain}
                className="btn-primary flex-1 justify-center min-h-[46px] text-sm font-semibold shadow-sm"
              >
                <Icon name="ArrowPathIcon" size={16} className="shrink-0" />
                Try Again with Card
              </button>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn-secondary px-5 min-h-[46px] text-sm font-medium"
                >
                  Review Order
                </button>
              )}
            </div>
          </div>
        )}

        {/* ===================== STATE 3: SUCCESS ===================== */}
        {status === 'success' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Animated Success Checkmark */}
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <Icon name="CheckCircleIcon" size={48} variant="solid" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                Payment Successful!
              </h3>
              <p className="text-xs text-emerald-700 font-semibold mt-1">
                Your transaction has been authorized & confirmed.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 text-xs space-y-2 text-left">
              {orderNumber && (
                <div className="flex justify-between items-center text-gray-600">
                  <span>Order Number:</span>
                  <span className="font-bold text-gray-900">{orderNumber}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-gray-600">
                <span>Amount Paid:</span>
                <span className="font-bold text-emerald-700 text-sm">
                  ${Number(amount || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Payment Method:</span>
                <span className="font-semibold text-gray-900 flex items-center gap-1">
                  <Icon name="CreditCardIcon" size={14} className="text-emerald-700" />
                  Credit / Debit Card (Stripe)
                </span>
              </div>
            </div>

            {/* Auto Redirecting Progress Indicator */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600 font-medium">
                <Icon name="ArrowPathIcon" size={14} className="animate-spin text-emerald-600" />
                <span>Redirecting to your Order Confirmation receipt...</span>
              </div>
              <div className="w-full bg-emerald-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-1.5 rounded-full animate-[progress_1.5s_ease-in-out_infinite] w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
