import { fetchGet } from '../../utils/fetch-utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Datatable from '../../components/Datatable';

function History() {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const getData = async () => {
		const result = await fetchGet(role + '/history', localStorage.getItem('token'));
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
	const actionArray = [];
	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'workspace_id.name', header: 'Workspace' },
		{ field: 'room_id.label', header: 'Room' },
		{ field: 'date', header: 'Date' },
		{ field: 'amount', header: 'Price' },
	];
	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<div className="px-10">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">Departments</div>
				</div>
				<Datatable data={data} array={datatableArray} action={actionArray} />
			</div>
		</div>
	);
}
export default History;
