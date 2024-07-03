/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchPost } from '../../utils/fetch-utils';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import Loading from '../Loading';

function AmenitiesSelection({ roomId, timing, date, next, roomPrice }) {
	const [items, setItems] = useState([]);
	const [selectedQuantities, setSelectedQuantities] = useState({});
	const [nextLoading, setNextLoading] = useState(false);
	const [amenitieLoading, setAmenitieLoading] = useState(false);

	const handleQuantityChange = (itemId, event) => {
		const newQuantity = parseInt(event.target.value);
		if (newQuantity >= 0 && newQuantity <= items.find((item) => item._id === itemId).quantity) {
			setSelectedQuantities({ ...selectedQuantities, [itemId]: newQuantity });
		}
	};

	const goNext = async () => {
		setNextLoading(true);
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
		setAmenitieLoading(true);
		const result = await fetchPost(
			'user/booking/availability/amenity/' + roomId,
			localStorage.getItem('token'),
			JSON.stringify({ date, timing })
		);
		if (result.success) {
			setItems(result.data);
		} else {
			window.location.reload();
		}
		setAmenitieLoading(false);
	};

	useEffect(() => {
		fetchAvailability(date);
	}, [date]);

	if (amenitieLoading) return <Loading />;

	return (
		<div>
			<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{items.map((amenitie, index) => (
					<div key={index} className="p-3 cursor-pointer shadow-md rounded-xl w-full bg-white">
						<div className="w-full overflow-hidden rounded-xl aspect-square">
							<img src={`${amenitie.image}`} className="w-full object-contain" alt="amenitie Image" />
						</div>
						<div className="mt-3">
							<div className="text-2xl font-semibold text-darkBlue">{amenitie.label}</div>
							<div className="text-ellipsis line-clamp-3 mt-3">{amenitie.description}</div>
							<div className="mt-2 text-darkBlue font-bold text-lg">Price: {amenitie.price}$ / hour</div>
							<Rating value={amenitie.rating} readOnly cancel={false} className="p-rating-item mt-3" />
						</div>
						<div className="mt-3 flex justify-between items-center gap-x-2">
							<div className="w-full">
								<InputText
									type="number"
									min="0"
									max={amenitie.quantity}
									value={selectedQuantities[amenitie._id] || ''}
									onChange={(e) => handleQuantityChange(amenitie._id, e)}
									disabled={amenitie.quantity === 0}
									className="w-full"
								/>
							</div>
							<div className="w-full text-darkBlue font-bold text-lg whitespace-nowrap">
								Available: {amenitie.quantity}
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-end">
				<Button
					className="bg-darkBlue text-white font-semibold border-0 rounded-md"
					onClick={goNext}
					loading={nextLoading}
				>
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
