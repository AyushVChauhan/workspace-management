import Datatable from '../../components/Datatable';
import { FaTrash } from 'react-icons/fa';
function RoomStatus() {
	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'name', header: 'UserName' },
		{ field: 'workspace', header: 'Workspace' },
		{ field: 'room', header: 'Room' },
		{ field: 'date', header: 'Date' },
		{ field: 'price', header: 'Price' },
	];

	const actionArray = [
		{
			icon: <FaTrash className="text-red-600" />,
			onClick: (e) => {
				confirmFunction(e);
			},
		},
	];
	const data = [
		{
			'index': '1',
			'name': 'john_doe',
			'workspace': 'Tech Hub',
			'room': 'Conference Room B',
			'date': '2024-07-01',
			'price': 60,
		},
	];
	return <Datatable array={datatableArray} action={actionArray} data={data} />;
}
export default RoomStatus;
