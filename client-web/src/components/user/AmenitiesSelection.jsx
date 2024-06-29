/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchPost } from '../../utils/fetch-utils';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function AmenitiesSelection({ roomId, timing, date, next, roomPrice }) {
	const [items, setItems] = useState([]);

	const [selectedQuantities, setSelectedQuantities] = useState({});

	const handleQuantityChange = (itemId, event) => {
		const newQuantity = parseInt(event.target.value);
		if (newQuantity >= 0 && newQuantity <= items.find((item) => item._id === itemId).quantity) {
			setSelectedQuantities({ ...selectedQuantities, [itemId]: newQuantity });
		}
	};

	const goNext = async () => {
		const token = localStorage.getItem('token');
		const result = await fetchPost(
			'user/booking/book/' + roomId,
			token,
			JSON.stringify({
				from: timing.from,
				to: timing.to,
				amenities: Object.keys(selectedQuantities).map((id) => ({ id, quantity: selectedQuantities[id] })),
				date,
			})
		);
		console.log(result);
		next(result.paymentId);
	};

	const fetchAvailability = async (date) => {
		const result = await fetchPost(
			'user/booking/availability/amenity/' + roomId,
			localStorage.getItem('token'),
			JSON.stringify({ date, timing })
		);
		if (result.success) {
			setItems(result.data);
		}
		console.log(result);
	};

	useEffect(() => {
		fetchAvailability(date);
	}, [date]);

	return (
		<div>
			{items.map((item) => (
				<div key={item.label} style={{ marginBottom: '10px' }}>
					<span>
						{item.label} - ${item.price}
					</span>
					<InputText
						type="number"
						min="0"
						max={item.quantity}
						value={selectedQuantities[item._id] || ''}
						onChange={(e) => handleQuantityChange(item._id, e)}
						disabled={item.quantity === 0}
						style={{ marginLeft: '10px', width: '100px' }}
					/>
					{item.quantity === 0 && <span style={{ color: 'red', marginLeft: '10px' }}> (Out of stock)</span>}
				</div>
			))}
			<div className="flex justify-end">
				<Button className="bg-darkBlue text-white font-semibold p-2" onClick={goNext}>
					Next -{' '}
					{roomPrice * (timing.to - timing.from) +
						Object.keys(selectedQuantities)
							.map((ele) => ({
								price: items.find((item) => item._id === ele).price,
								quantity: selectedQuantities[ele],
							}))
							.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
					$
				</Button>
			</div>
		</div>
	);
}

export default AmenitiesSelection;
