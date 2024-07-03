import { useState, useEffect } from 'react';
import { fetchGet } from '../../utils/fetch-utils';
import { useNavigate } from 'react-router-dom';
import Datatable from '../../components/Datatable';
function UserBookings() {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();

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
export default UserBookings;
