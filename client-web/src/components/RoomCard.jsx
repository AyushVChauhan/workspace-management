import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'primereact/rating';
function RoomCard({ room }) {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();
	console.log(room);
	return (
		<div
			onClick={() => {
				if (role == 'admin') {
					navigate(`/${role}/workspacedetails/${room._id}`);
				}
			}}
			className="p-2  cursor-pointer  gap-10 rounded-xl justify-center items-center flex  flex-col  "
		>
			<div className="bg-white shadow-lg rounded-md ms-10 p-5 flex w-96 h-64 overflow-hidden">
				<img
					src={`${import.meta.env.VITE_URL}uploads/${room.image}`}
					className="rounded-md h-24 w-24 object-cover"
				></img>
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
								<Button
									onClick={() => {
										navigate(`/${role}/roomBook/${room._id}`);
									}}
									className="bg-darkBlue text-white font-bold py-2 mr-0 px-4 rounded mt-4 self-end justify-end"
								>
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
