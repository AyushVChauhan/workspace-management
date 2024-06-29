import { Rating } from 'primereact/rating';
import React from 'react';

const AmenitiesCard = ({ amenitie }) => {
	return (
		<div className="bg-white shadow-lg rounded-md m-5 p-5 flex w-80 overflow-hidden">
			<img src="/vite.svg" className="rounded-md h-24 w-24 object-cover"></img>
			<div className="ml-5 flex flex-col justify-between w-full overflow-hidden">
				<div>
					<div className="text-darkBlue font-bold text-xl text-center">{amenitie.label}</div>
					<div className="mt-2 text-darkBlue font-semibold text-sm text-justify break-words">
						<Rating value={amenitie.rating} readOnly cancel={false} className="p-rating-item" />
					</div>
					<div className="mt-2 text-darkBlue font-bold text-lg">{`Quantity: ${amenitie.quantity}`}</div>
				</div>
			</div>
		</div>
	);
};

export default AmenitiesCard;
