import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RoomCard from '../../components/RoomCard';
import { fetchGet } from '../../utils/fetch-utils';
import { Rating } from 'primereact/rating';
import AmenitiesCard from '../../components/AmenitiesCard';

const WorkspaceDetail = () => {
	const { id } = useParams();
	const role = localStorage.getItem('role').toLowerCase();
	const [room, setRoom] = useState([]);
	const [workspace, setWorkspace] = useState({
		name: '',
		address: '',
		rating: 0,
		description: '',
		amenities: [],
		timeFrom: '',
		timeTo: '',
	});
	const navigate = useNavigate();

	const getRooms = async () => {
		try {
			const result = await fetchGet(`${role}/workspace/${id}`, localStorage.getItem('token'));
			if (result.success) {
				setRoom(result.data.rooms);
				setWorkspace({
					name: result.data.name,
					address: result.data.address,
					rating: result.data.rating,
					description: result.data.description,
					amenities: result.data.amenities || [], // Initialize amenities as an empty array if undefined
					timeFrom: result.data.timing.from,
					timeTo: result.data.timing.to,
				});
			} else {
				navigate('/');
			}
		} catch (error) {
			console.error('Error fetching rooms:', error);
		}
	};

	useEffect(() => {
		getRooms();
	}, [id]);

	return (
		<>
			<div className="flex justify-between items-center">
				<div className="text-4xl ml-20 font-bold">{workspace.name}</div>
			</div>
			<div className="rounded-md p-5 flex flex-col w-[90%] m-14">
				<div className="flex gap-10">
					<div className="flex flex-col justify-center w-full overflow-hidden">
						<div className="mt-2 text-darkBlue font-semibold text-xl text-justify break-words">
							{workspace.address}
						</div>
						<div className="mt-2 text-darkBlue font-bold text-lg">
							<Rating value={workspace.rating} readOnly cancel={false} className="p-rating-item" />
						</div>
						<div className="mt-2 text-darkBlue text-xl">{workspace.description}</div>
						<div className="mt-2 text-darkBlue text-xl">{`From:   ${workspace.timeFrom}:00am to ${workspace.timeTo}:00pm `}</div>
					</div>
					<img src="/vite.svg" className="rounded-md h-60 w-60 object-cover" alt="Workspace Image" />
				</div>
			</div>

			<div className="flex justify-between items-center">
				<div className="text-4xl ml-20 font-bold">Rooms</div>
			</div>
			<div className="flex flex-wrap w-[90%] m-14">
				{room.map((ele, ind) => (
					<RoomCard key={ele._id} room={ele} />
				))}
			</div>

			<div className="flex justify-between items-center">
				<div className="text-4xl ml-20 font-bold">Amenities</div>
			</div>
			<div className="flex flex-wrap w-[90%] m-14">
				{workspace.amenities.map((ele, ind) => (
					<AmenitiesCard key={ele._id} amenitie={ele} />
				))}
			</div>
		</>
	);
};

export default WorkspaceDetail;
