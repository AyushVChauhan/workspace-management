import Datatable from '../../components/Datatable';
import { FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-utils';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import RoomCard from '../../components/RoomCard';
function UserBookings() {
	const [date, setDate] = useState(null);
	const [room, setRoom] = useState([]);

	const [workspace, setWorkspace] = useState([]);
	const [selectedWorkspace, setSelectedWorkspace] = useState();
	const navigate = useNavigate();
	const role = localStorage.getItem('role').toLowerCase();

	const getWorkspace = async () => {
		const result = await fetchGet(`${role}/workspace`, localStorage.getItem('token'));
		if (result.success) {
			setWorkspace(result.data);
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		getWorkspace();
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
	//
	return (
		<>
			<div className="flex flex-row text-4xl font-bold">
				<div className="w-1/2 p-2">
					<div className="text-3xl ml-20 font-bold mb-4">SELECT WORKSPACE</div>
					{workspace && (
						<Dropdown
							value={selectedWorkspace}
							onChange={(e) => setSelectedWorkspace(e.value)}
							options={workspace}
							optionLabel="name"
							placeholder="Select a Workspace"
							className="w-full rounded ml-20 mb-4"
						/>
					)}
				</div>
			</div>
			<div className="flex justify-between items-center p-2">
				<div className="text-3xl ml-20 font-bold ">ROOMS</div>
			</div>
			<div className="flex flex-wrap  mt-4 ">
				{room.map((ele, ind) => (
					<RoomCard key={ele._id} room={ele} />
				))}
			</div>
		</>
	);
}
export default UserBookings;
