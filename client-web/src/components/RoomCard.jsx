import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

function RoomCard({ room }) {
	const role = localStorage.getItem('role').toLowerCase();

	return (
		<div className="bg-white shadow-lg rounded-md m-5 p-5 flex w-80 overflow-hidden">
			<img src="/vite.svg" className="rounded-md h-24 w-24 object-cover"></img>
			<div className="ml-5 flex flex-col justify-between w-full overflow-hidden">
				<div>
					<div className="text-darkBlue font-bold text-xl ">{room.label}</div>
					<div className="mt-2 text-darkBlue font-semibold text-sm text-justify break-words">
						<Rating value={room.rating} readOnly cancel={false} className="p-rating-item" />
					</div>
					<div className="mt-2 text-darkBlue font-bold text-lg">Price: {room.price}</div>
					{role == 'user' && (
						<Button className="bg-darkBlue text-white font-bold py-2 mr-0 px-4 rounded mt-4 self-end justify-end">
							+ Book
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default RoomCard;
