import { useState } from 'react';
import { Steps } from 'primereact/steps';
import DaySelection from '../../components/user/DaySelection';
import AmenitiesSelection from '../../components/user/AmenitiesSelection';
import Payment from '../../components/user/Payment';
import { IoCalendarNumber } from 'react-icons/io5';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { FaShapes } from 'react-icons/fa6';

function RoomBooking() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [clientSecret, setClientSecret] = useState('');
	const roomId = '667fbd7d433a1293140889e6';
	const roomPrice = 300;

	//day selection
	const [timing, setTiming] = useState({ from: null, to: null });
	const [date, setDate] = useState(new Date());

	const itemRenderer = (item, itemIndex) => {
		const isActiveItem = activeIndex === itemIndex;
		return (
			<>
				<span
					className={`flex items-center justify-center rounded-full border border-1 border-darkBlue h-10 w-10 z-[1] mb-7 cursor-pointer ${
						isActiveItem ? 'bg-darkBlue text-white' : 'bg-white text-darkBlue'
					}`}
				>
					{item.icon}
				</span>
				<div className="select-none absolute top-10 text-sm md:text-base text-center">{item.label}</div>
			</>
		);
	};

	const items = [
		{
			icon: <IoCalendarNumber size={20} />,
			label: 'Day selection',
			template: (item) => itemRenderer(item, 0),
		},
		{
			icon: <FaShapes size={17} />,
			label: 'Amenities Selection',
			template: (item) => itemRenderer(item, 1),
		},
		{
			icon: <FaIndianRupeeSign size={20} />,
			label: 'Payment',
			template: (item) => itemRenderer(item, 2),
		},
	];
	return (
		<div>
			<div className="px-10">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">Room Booking</div>
				</div>
				<div className="card mt-10 mb-10">
					<Steps model={items} activeIndex={activeIndex} readOnly={false} />
				</div>
				{activeIndex == 0 && (
					<DaySelection
						roomId={roomId}
						timing={timing}
						date={date}
						roomPrice={roomPrice}
						next={(time, date) => {
							setTiming(time);
							setDate(date);
							setActiveIndex(1);
						}}
					/>
				)}
				{activeIndex == 1 && (
					<AmenitiesSelection
						roomId={roomId}
						timing={timing}
						date={date}
						roomPrice={roomPrice}
						next={(clientSecret) => {
							setClientSecret(clientSecret);
							setActiveIndex(2);
						}}
						prevPage={() => setActiveIndex(0)}
					/>
				)}
				{activeIndex == 2 && (
					<Payment
						clientSecret={clientSecret}
						nextPage={() => {
							setActiveIndex(3);
						}}
						prevPage={() => {
							setActiveIndex(1);
						}}
					/>
				)}
			</div>
		</div>
	);
}

export default RoomBooking;
