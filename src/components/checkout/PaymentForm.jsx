import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Icon from '../ui/AppIcon';
import paymentService from '../../services/paymentService';

export default function PaymentForm({ orderId, amount, onSuccess, onError, onBack }: PaymentFormProps) {
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
        amount(amount * 100),
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
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <label className="app-label mb-2 block">Card Details</label>
        <CardElement
          onChange={handleCardChange}
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1f2937',
                '::placeholder': { color: '#9ca3af' },
              },
              invalid: {
                color: '#ef4444',
              },
            },
          }}
        />
      </div>

      {cardError && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <Icon name="ExclamationTriangleIcon" size={14} />
          {cardError}
        </p>
      )}

      <div className="flex gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={processing}
            className="btn-secondary min-h-[44px] flex-1 justify-center"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={!stripe || !cardComplete || processing}
          className="btn-primary min-h-[44px] flex-1 justify-center disabled:opacity-70"
        >
          {processing ? (
            <>
              <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
}
