import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from 'primereact/button';
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
					<h1 className="text-darkBlue text-2xl mb-10 font-medium   ">Complete your payment here!</h1>
					<PaymentElement />
					<div>
						<Button
							className="bg-darkBlue text-white font-semibold mt-6  p-2"
							disabled={isLoading || !stripe || !elements}
						>
							{isLoading ? 'Loading...' : 'Pay now'}
						</Button>
					</div>
					{message && <div>{message}</div>}
				</div>
			</div>
		</form>
	);
}

export default PaymentForm;
