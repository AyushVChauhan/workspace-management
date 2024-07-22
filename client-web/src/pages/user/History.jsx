import { fetchGet } from '../../utils/fetch-utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Datatable from '../../components/Datatable';
import { FaEye } from 'react-icons/fa6';
import HistoryPreview from '../../components/user/HistoryPreview';

function History() {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [preview, setPreview] = useState(false);
	const [previewData, setPreviewData] = useState({
		workspace: '',
		room: '',
		date: '',
		from: '',
		to: '',
		address: '',
		amount: '',
		amenities: [],
		qty: [],
	});
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
	const actionArray = [
		{
			icon: <FaEye className="text-darkBlue" size={20} />,
			onClick: (e) => {
				setPreview(true);
				setPreviewData({
					workspace: e.workspace_id.name,
					date: e.date,
					room: e.room_id.label,
					from: e.timing.from,
					to: e.timing.to,
					address: e.workspace_id.address,
					amount: e.amount,
					amenities: e.amenities,
				});
			},
		},
	];
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
					<div className="text-4xl font-bold">History</div>
				</div>
				{preview && (
					<HistoryPreview
						onClose={() => setPreview(false)}
						workspace={previewData.workspace}
						room={previewData.room}
						date={previewData.date}
						from={previewData.from}
						to={previewData.to}
						address={previewData.address}
						amount={previewData.amount}
						amenities={previewData.amenities}
						qty={previewData.qty}
					/>
				)}
				<Datatable data={data} array={datatableArray} action={actionArray} />
			</div>
		</div>
	);
}
export default History;
