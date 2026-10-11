import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Icon from '../ui/AppIcon';
import paymentService from '../../services/paymentService';

export default function PaymentForm({ orderId, amount, onSuccess, onError, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);

  const handleCardChange = (event) => {
    setCardError(event.error?.message || null);
    setCardComplete(event.complete);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      onError('Stripe is not initialized. Please try again.');
      return;
    }

    setProcessing(true);
    setCardError(null);

    try {
      const intentResponse = await paymentService.createPaymentIntent({
        orderId,
        amount: Math.round(amount * 100),
        currency: 'usd',
      });

      if (!intentResponse.success) {
        onError('Failed to create payment. Please try again.');
        setProcessing(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        onError('Card element not found.');
        setProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(intentResponse.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setCardError(error.message || 'Payment failed');
        onError(error.message || 'Payment failed');
        setProcessing(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        const confirmResponse = await paymentService.confirmPayment({
          paymentIntentId: paymentIntent.id,
          orderId,
        });

        if (confirmResponse.success) {
          onSuccess(paymentIntent.id);
        } else {
          onError(confirmResponse.message || 'Payment confirmation failed');
        }
      }
    } catch (err) {
      setCardError(err.message || 'An unexpected error occurred');
      onError(err.message || 'Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white border-2 border-emerald-600/30 rounded-xl p-4 sm:p-5 bg-gradient-to-b from-emerald-50/20 to-white shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Icon name="CreditCardIcon" size={18} />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-900 block leading-tight">Card Payment Details</label>
              <span className="text-[11px] text-emerald-700 font-medium">Only Card Payment Accepted</span>
            </div>
          </div>
          {/* Card brand badges */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold">
            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">VISA</span>
            <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">MC</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">AMEX</span>
            <span className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">DISC</span>
          </div>
        </div>

        <div className="bg-white border border-gray-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-lg p-3.5 transition-all">
          <CardElement
            onChange={handleCardChange}
            options={{
              style: {
                base: {
                  fontSize: '15px',
                  color: '#111827',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  '::placeholder': { color: '#9ca3af' },
                },
                invalid: {
                  color: '#dc2626',
                },
              },
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <Icon name="LockClosedIcon" size={13} />
            256-Bit SSL Encrypted
          </span>
          <span className="text-gray-400">Powered by Stripe</span>
        </div>
      </div>

      {cardError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
          <Icon name="ExclamationTriangleIcon" size={16} className="shrink-0 text-red-600" />
          <span>{cardError}</span>
        </div>
      )}

      <div className="flex gap-3 pt-1">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={processing}
            className="btn-secondary min-h-[44px] px-5 text-sm"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={!stripe || !cardComplete || processing}
          className="btn-primary min-h-[44px] flex-1 justify-center text-sm font-semibold shadow-sm disabled:opacity-60"
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
              Processing Payment...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              <Icon name="LockClosedIcon" size={16} />
              Pay ${amount.toFixed(2)} with Card
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
