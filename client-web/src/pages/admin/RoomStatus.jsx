import Datatable from '../../components/Datatable';
import { FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { fetchGet } from '../../utils/fetch-utils';
function RoomStatus() {
	const role = localStorage.getItem('role').toLowerCase();

	const [data, setData] = useState();
	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'user_id.username', header: 'UserName' },
		{ field: 'workspace_id.name', header: 'Workspace' },
		{ field: 'room_id.label', header: 'Room' },
		{ field: 'date', header: 'Date' },
		{ field: 'amount', header: 'Price' },
	];

	const getData = async () => {
		const result = await fetchGet(`${role}/history`, localStorage.getItem('token'));

		if (result.success) {
			setData(
				result.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
				}))
			);
		} else {
			navigate('/');
		}
	};
	console.log(data);
	useEffect(() => {
		getData();
	}, []);
	return (
		<>
			<div className="text-4xl font-bold p-2">User Bookings</div>
			<Datatable array={datatableArray} data={data} />
		</>
	);
}
export default RoomStatus;
