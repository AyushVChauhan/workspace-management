import { Calendar } from 'primereact/calendar';
import { fetchPost } from '../../utils/fetch-utils';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { useParams } from 'react-router-dom';
function RoomStatusManagement() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const { id } = useParams();
	const [data, setData] = useState();
	const role = localStorage.getItem('role').toLowerCase();

	const statusBodyTemplate = (rowData) => {
		return (
			<Tag
				value={rowData.status}
				severity={rowData.status === 'Not Booked' ? 'danger' : 'success'}
				style={{ width: '100px', textAlign: 'center' }}
			></Tag>
		);
	};

	const getData = async (date) => {
		const result = await fetchPost(
			`${role}/history/room/${id}`,
			localStorage.getItem('token'),
			JSON.stringify({ date: date })
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
	};
	console.log(data);
	useEffect(() => {
		getData(new Date());
	}, []);

	const handleDateChange = async (e) => {
		const date = e.value;
		setSelectedDate(date);
		getData(date);
	};

	return (
		<>
			<div className="px-10">
				<div className="flex justify-between items-center my-4 mb-5">
					<div className="text-4xl font-bold">Room Status Management</div>
				</div>
				<div className="my-4">
					<Calendar
						value={selectedDate}
						onChange={handleDateChange}
						showIcon
						className="p-inputtext-lg w-full md:w-4/12 mb-4"
						dateFormat="yy-mm-dd"
						placeholder="Select a date"
					/>
				</div>
				{selectedDate && (
					<div className="my-4 w-5/6 mt-3">
						<div className="card">
							<DataTable
								value={data}
								tableStyle={{ minWidth: '30rem', border: '1px solid #ccc' }}
								className="border border-collapse"
								stripedRows
							>
								<Column field="hour" header="Hour"></Column>
								<Column header="Status" body={statusBodyTemplate}></Column>
								<Column field="amenityStatus" header="Amenities"></Column>
							</DataTable>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default RoomStatusManagement;
