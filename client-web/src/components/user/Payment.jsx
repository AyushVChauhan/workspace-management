import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripe = await loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY);

// eslint-disable-next-line react/prop-types
function Payment({ clientSecret }) {
	return (
		<Elements stripe={stripe} options={{ clientSecret, theme: 'stripe' }}>
			<PaymentForm />
		</Elements>
	);
}

export default Payment;
