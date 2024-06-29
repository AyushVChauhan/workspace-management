import { Rating } from 'primereact/rating';
import React from 'react';

const AmenitiesCard = ({ amenitie }) => {
	return (
		<div className="bg-white shadow-lg rounded-md m-5  gap-4 p-5 flex w-[40%] h-64 self-center  overflow-hidden">
			<img
				src={`${import.meta.env.VITE_URL}uploads/${amenitie.image}`}
				className="rounded-md h-32 w-30 object-cover self-center"
			></img>
			<div className="ml-5 flex flex-col justify-between w-full self-center  overflow-hidden">
				<div>
					<div className="text-darkBlue font-bold text-xl">{amenitie.label}</div>
					<div className="mt-2 text-darkBlue font-semibold text-sm text-justify break-words">
						{amenitie.description}
					</div>
					<div className="mt-2 text-darkBlue font-bold text-lg">{`Quantity: ${amenitie.quantity}`}</div>
					<div className="mt-2 text-darkBlue font-semibold text-sm text-justify break-words">
						<Rating value={amenitie.rating} readOnly cancel={false} className="p-rating-item" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AmenitiesCard;
