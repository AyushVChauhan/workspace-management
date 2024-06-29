import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

function PaymentForm() {
	const elements = useElements();
	const stripe = useStripe();
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		setMessage('Payment in Progress');

		const resp = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: import.meta.env.VITE_PAYMENT_SUCCESS_URL,
			},
		});

		if (resp.error) setMessage('Some Error Occurred !!');
		setIsLoading(false);
	};
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<div>
					<h1>Complete your payment here!</h1>
					<PaymentElement />
					<div>
						<button disabled={isLoading || !stripe || !elements}>
							{isLoading ? 'Loading...' : 'Pay now'}
						</button>
					</div>
					{message && <div>{message}</div>}
				</div>
			</div>
		</form>
	);
}

export default PaymentForm;
