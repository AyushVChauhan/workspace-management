import { Calendar } from 'primereact/calendar';
import { fetchPost } from '../../utils/fetch-utils';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { useParams } from 'react-router-dom';
function RoomStatusManagement() {
	const role = localStorage.getItem('role').toLowerCase();
	const [selectedDate, setSelectedDate] = useState();
	const { id } = useParams();
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);

	const statusBodyTemplate = (rowData) => {
		return (
			<Tag
				value={rowData.status}
				severity={rowData.status === 'Not Booked' ? 'danger' : 'success'}
				style={{ width: '100px', textAlign: 'center' }}
			></Tag>
		);
	};

	const getData = async () => {
		setLoading(true);
		const result = await fetchPost(
			`${role}/history/room/${id}`,
			localStorage.getItem('token'),
			JSON.stringify({ date: selectedDate })
		);
		if (result.success) {
			setData(
				result.data.map((ele) => ({
					hour: `${ele.time.from}.00 - ${ele.time.to}.00`,
					status: ele.available ? 'Not Booked' : 'Booked by ' + ele.user,
					amenityStatus:
						ele.amenities.length == 0
							? 'None'
							: ele.amenities.map((am) => `${am.id.label} - x${am.quantity}`).join(', '),
				}))
			);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (selectedDate) {
			getData();
		}
	}, [selectedDate]);

	return (
		<div>
			<div className="text-4xl font-bold">Room Status Management</div>
			<div className="my-4">
				<Calendar
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.value)}
					showIcon
					className="w-full md:w-1/2"
					placeholder="Select a date"
				/>
			</div>
			{selectedDate && (
				<div className="my-4">
					<DataTable value={data} tableStyle={{ border: '1px solid #ccc' }} stripedRows loading={loading}>
						<Column field="hour" header="Hour"></Column>
						<Column header="Status" body={statusBodyTemplate}></Column>
						<Column field="amenityStatus" header="Amenities"></Column>
					</DataTable>
				</div>
			)}
		</div>
	);
}

export default RoomStatusManagement;
