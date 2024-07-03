/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'primereact/rating';
function RoomCard({ room }) {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();
	return (
		<div
			onClick={() => {
				if (role == 'admin') {
					navigate(`/${role}/room-status/${room._id}`);
				}
			}}
			className="p-3 cursor-pointer shadow-md rounded-xl w-full bg-white"
		>
			<div className="w-full overflow-hidden rounded-xl aspect-square">
				<img src={`${room.image}`} className="w-full object-contain" alt="Room Image" />
			</div>
			<div className="mt-3">
				<div className="text-2xl font-semibold text-darkBlue">{room.label}</div>
				<div className="text-ellipsis line-clamp-3 mt-3">{room.description}</div>
				<div className="mt-2 text-darkBlue font-bold text-lg">Price: {room.price}$ / hour</div>
				<Rating value={room.rating} readOnly cancel={false} className="p-rating-item mt-3" />
			</div>
			{role == 'user' && (
				<div className="mt-3 text-end">
					<Button
						onClick={() => {
							navigate(`/${role}/room-book/${room._id}`);
						}}
						className="bg-darkBlue rounded-md border-0"
					>
						Book
					</Button>
				</div>
			)}
		</div>
	);
}

export default RoomCard;
