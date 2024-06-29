import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomCard from '../../components/RoomCard';
import { fetchGet } from '../../utils/fetch-utils';

const WorkspaceDetail = () => {
	const { id } = useParams();
	const role = localStorage.getItem('role').toLowerCase();
	const [room, setRoom] = useState([]); // Initialize room as an empty array
	const [workspace, setWorkspace] = useState({});
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
					amenities: result.data.amenities,
				});
			} else {
				throw new Error('Failed to fetch rooms');
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
				<div className="text-4xl font-bold">{workspace.name}</div>
			</div>
			<div className="rounded-md m-5 p-5 flex flex-col ">
				<div className="flex ">
					<img src="/vite.svg" className="rounded-md h-60 w-60 object-cover"></img>
					<div className="ml-5 flex flex-col justify-between overflow-hidden">
						<div>
							<div className="mt-2 text-darkBlue font-semibold text-sm text-justify break-words">
								{workspace.address}
							</div>
							<div className="mt-2 text-darkBlue font-bold text-lg">{workspace.rating}</div>
						</div>
					</div>
				</div>
				<div className="mt-2 text-darkBlue font-bold text-lg">{workspace.description}</div>
			</div>
			<div className="flex ">
				{room &&
					room.map((ele, ind) => {
						return <RoomCard key={ele._id} room={ele} />;
					})}
			</div>
		</>
	);
};

export default WorkspaceDetail;
