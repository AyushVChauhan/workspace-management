import { Button } from 'primereact/button';

function RoomCard({ room }) {
	return (
		<div className="bg-white shadow-lg rounded-md m-5 p-5 flex w-80 overflow-hidden">
			<img src="/vite.svg" className="rounded-md h-24 w-24 object-cover"></img>
			<div className="ml-5 flex flex-col justify-between w-full overflow-hidden">
				<div>
					<div className="text-darkBlue font-bold text-xl text-center">{room.label}</div>
					<div className="mt-2 text-darkBlue font-semibold text-sm text-justify break-words">{}</div>
					<div className="mt-2 text-darkBlue font-bold text-lg">Price: {room.price}</div>
					<div className="mt-2 text-darkBlue font-bold text-lg">Ratings: {room.rating}</div>
				</div>
			</div>
		</div>
	);
}

export default RoomCard;
