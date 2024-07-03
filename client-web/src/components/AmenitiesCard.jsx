/* eslint-disable react/prop-types */
import { Rating } from 'primereact/rating';
import { useNavigate } from 'react-router-dom';

const AmenitiesCard = ({ amenitie }) => {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();
	return (
		<div
			onClick={() => {
				if (role == 'admin') {
					navigate(`/${role}/amenitie-status/${amenitie._id}`);
				}
			}}
			className="p-3 cursor-pointer shadow-md rounded-xl w-full bg-white"
		>
			<div className="w-full overflow-hidden rounded-xl aspect-square">
				<img src={`${amenitie.image}`} className="w-full object-contain" alt="amenitie Image" />
			</div>
			<div className="mt-3">
				<div className="text-2xl font-semibold text-darkBlue">{amenitie.label}</div>
				<div className="text-ellipsis line-clamp-3 mt-3">{amenitie.description}</div>
				<div className="mt-2 text-darkBlue font-bold text-lg">Price: {amenitie.price}$ / hour</div>
				<Rating value={amenitie.rating} readOnly cancel={false} className="p-rating-item mt-3" />
			</div>
		</div>
	);
};

export default AmenitiesCard;
