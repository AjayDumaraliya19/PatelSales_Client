import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Icon from '../ui/AppIcon';
import paymentService from '../../services/paymentService';
import PaymentProcessingModal from './PaymentProcessingModal';

export default function PaymentForm({ orderId, order, amount, onSuccess, onError, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);

  // Dedicated payment processing modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: 'processing', // 'processing' | 'failed' | 'success'
    step: 2, // 1 to 4
    errorMessage: '',
    confirmedOrder: null,
  });

  const handleCardChange = (event) => {
    setCardError(event.error?.message || null);
    setCardComplete(event.complete);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      const msg = 'Stripe payment gateway is not initialized. Please refresh and try again.';
      setCardError(msg);
      if (onError) onError(msg);
      return;
    }

    if (!cardComplete) {
      const msg = 'Please enter complete credit or debit card details.';
      setCardError(msg);
      return;
    }

    setCardError(null);

    // Launch full-screen processing modal immediately
    setModalState({
      isOpen: true,
      status: 'processing',
      step: 2,
      errorMessage: '',
      confirmedOrder: null,
    });

    try {
      // Step 2: Create PaymentIntent with backend
      const intentResponse = await paymentService.createPaymentIntent({
        orderId,
        amount: Math.round(amount * 100),
        currency: 'usd',
      });

      if (!intentResponse?.success || !intentResponse?.clientSecret) {
        throw new Error(intentResponse?.message || 'Failed to initialize payment gateway.');
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Payment input field was not found.');
      }

      // Step 3: Authorize Card with Stripe
      setModalState((prev) => ({ ...prev, step: 3 }));

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        intentResponse.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message || 'Payment was declined by card issuer.');
      }

      if (paymentIntent?.status !== 'succeeded') {
        throw new Error(`Payment status is ${paymentIntent?.status || 'incomplete'}.`);
      }

      // Step 4: Confirm payment in backend and update order status to 'paid'
      setModalState((prev) => ({ ...prev, step: 4 }));

      const confirmResponse = await paymentService.confirmPayment({
        paymentIntentId: paymentIntent.id,
        orderId,
      });

      const finalOrder = confirmResponse?.order || order || { _id: orderId, orderNumber: order?.orderNumber };

      // Step 5: Show Success Screen
      setModalState({
        isOpen: true,
        status: 'success',
        step: 4,
        errorMessage: '',
        confirmedOrder: finalOrder,
      });

      // Smooth auto-redirect after user sees confirmation
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(finalOrder, paymentIntent.id);
        }
      }, 1600);
    } catch (err) {
      console.error('Payment processing failed:', err);
      const friendlyError = err?.response?.data?.message || err?.message || 'Payment processing failed. Please try again.';

      setCardError(friendlyError);
      if (onError) onError(friendlyError);

      // Transition modal to FAILED state
      setModalState((prev) => ({
        ...prev,
        isOpen: true,
        status: 'failed',
        errorMessage: friendlyError,
      }));
    }
  };

  const handleTryAgain = () => {
    // Close modal and keep user on the card form to retry
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
      status: 'processing',
      errorMessage: '',
    }));
  };

  const handleCancelModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (onBack) onBack();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white border-2 border-emerald-600/40 rounded-xl p-4 sm:p-5 bg-gradient-to-b from-emerald-50/20 to-white shadow-sm">
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
                    color: '#0f172a',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    fontWeight: '500',
                    '::placeholder': { color: '#94a3b8' },
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
              disabled={modalState.isOpen}
              className="btn-secondary min-h-[46px] px-5 text-sm"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={!stripe || !cardComplete || modalState.isOpen}
            className="btn-primary min-h-[46px] flex-1 justify-center text-sm font-semibold shadow-sm disabled:opacity-60 transition-all hover:shadow-md"
          >
            <span className="flex items-center justify-center gap-2">
              <Icon name="LockClosedIcon" size={16} />
              Pay ${Number(amount || 0).toFixed(2)} with Card
            </span>
          </button>
        </div>
      </form>

      {/* Full-Screen Payment Processing, Failed & Success Modal */}
      <PaymentProcessingModal
        isOpen={modalState.isOpen}
        status={modalState.status}
        step={modalState.step}
        errorMessage={modalState.errorMessage}
        amount={amount}
        orderNumber={modalState.confirmedOrder?.orderNumber || order?.orderNumber || ''}
        onTryAgain={handleTryAgain}
        onCancel={handleCancelModal}
      />
    </>
  );
}
