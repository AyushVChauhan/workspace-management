import { useState, useEffect } from 'react';
import { fetchGet } from '../../utils/fetch-utils';
import useData from '../../hooks/use-data';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../../components/RoomCard';
import { Dropdown } from 'primereact/dropdown';
function RoomStatus() {
	const role = localStorage.getItem('role').toLowerCase();
	const [room, setRoom] = useState([]);
	const [getWorkspaceData, workspace, workspaceLoading] = useData([], { url: `${role}/workspace/` });
	const [selectedWorkspace, setSelectedWorkspace] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		getWorkspaceData();
	}, []);

	const getRooms = async (id) => {
		const result = await fetchGet(`${role}/workspace/${id}`, localStorage.getItem('token'));
		if (result.success) {
			setRoom(result.data.rooms);
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		console.log(selectedWorkspace);
		if (selectedWorkspace) {
			getRooms(selectedWorkspace?._id);
		}
	}, [selectedWorkspace]);

	return (
		<div>
			<div className="text-4xl font-bold">Room Booking Status</div>
			<div className="mt-5">
				<label htmlFor={`title`} className="block text-sm font-bold text-gray-600">
					SELECT WORKSPACE
				</label>
				<Dropdown
					value={selectedWorkspace}
					onChange={(e) => setSelectedWorkspace(e.value)}
					options={workspace}
					optionLabel="name"
					placeholder="Select a Workspace"
					className="w-full md:w-1/2 rounded"
					loading={workspaceLoading}
				/>
			</div>

			<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
				{room.map((ele, ind) => (
					<RoomCard key={ind} room={ele} />
				))}
			</div>
		</div>
	);
}
export default RoomStatus;
