import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'primereact/rating';
function RoomCard({ room }) {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();
	return (
		<div
			onClick={() => {
				navigate(`/${role}/workspacedetails/${room._id}`);
			}}
			className="p-2  cursor-pointer  gap-10 rounded-xl justify-center items-center flex  flex-col  "
		>
			<div className="bg-white shadow-lg rounded-md ms-10 p-5 flex w-80 overflow-hidden">
				<img src="/vite.svg" className="rounded-md h-24 w-24 object-cover"></img>
				<div className="ml-5 flex flex-col justify-between w-full overflow-hidden">
					<div>
						<div className="text-darkBlue font-bold text-xl text-center">{room.label}</div>
						<div className="mt-2 text-darkBlue font-semibold text-sm text-justify break-words">
							{room.description}
						</div>
						<div className="mt-2 text-darkBlue font-bold text-lg">Price: {room.price}</div>
						<Rating value={room.rating} readOnly cancel={false} className="p-rating-item" />

						<div>
							{role == 'user' && (
								<Button className="bg-darkBlue text-white font-bold py-2 mr-0 px-4 rounded mt-4 self-end justify-end">
									+ Book
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RoomCard;
