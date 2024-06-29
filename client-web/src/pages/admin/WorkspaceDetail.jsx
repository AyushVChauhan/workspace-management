import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RoomCard from '../../components/RoomCard';
import { fetchGet } from '../../utils/fetch-utils';
import { Rating } from 'primereact/rating';
import AmenitiesCard from '../../components/AmenitiesCard';
import { TabMenu } from 'primereact/tabmenu';
import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import RoomStatusManagement from './RoomStatusManagement';

const WorkspaceDetail = () => {
	const { id } = useParams();
	const role = localStorage.getItem('role').toLowerCase();
	const [room, setRoom] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [chartData, setChartData] = useState();
	const [chartOptions, setChartOptions] = useState({});
	const [workspace, setWorkspace] = useState({
		name: '',
		address: '',
		rating: 0,
		description: '',
		amenities: [],
		timeFrom: '',
		timeTo: '',
		image: [],
	});
	const navigate = useNavigate();

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
					amenities: result.data.amenities || [],
					timeFrom: result.data.timing.from,
					timeTo: result.data.timing.to,
					image: result.data.images,
				});
			} else {
				navigate('/');
			}
		} catch (error) {
			console.error('Error fetching rooms:', error);
		}
	};

	const items = [
		{ label: 'Basic Details', icon: 'pi pi-list', className: 'me-6' },
		{ label: 'Booking Insights', icon: 'pi pi-chart-line', className: 'ms-3 me-3' },
	];

	const roomStatus = () => {
		const totalStudents = 50;
		let submitCount = 10;
		let pendingCount = 20;
		let disqualifyCount = 3;
		let absent = 12;

		const documentStyle = getComputedStyle(document.documentElement);
		const data = {
			labels: ['ROOM1', 'SUBM', 'DISQUALIFY', 'ABSENT'],
			datasets: [
				{
					data: [pendingCount, submitCount, disqualifyCount, absent],
					backgroundColor: [
						documentStyle.getPropertyValue('--yellow-500'),
						documentStyle.getPropertyValue('--green-500'),
						documentStyle.getPropertyValue('--red-500'),
						documentStyle.getPropertyValue('--gray-500'),
					],
					hoverBackgroundColor: [
						documentStyle.getPropertyValue('--yellow-400'),
						documentStyle.getPropertyValue('--green-400'),
						documentStyle.getPropertyValue('--red-400'),
						documentStyle.getPropertyValue('--gray-400'),
					],
				},
			],
		};
		const options = {
			plugins: {
				tooltip: {
					callbacks: {
						label: function (context) {
							let label =
								context.formattedValue +
								' (' +
								((context.formattedValue / totalStudents) * 100).toFixed(2) +
								' %)';
							return label;
						},
					},
				},
				title: {
					color: '#000',
					display: true,
					text: 'Room Status',
					font: {
						size: 20,
					},
					padding: {
						bottom: 20,
					},
				},
				legend: {
					labels: {
						usePointStyle: true,
					},
					position: 'bottom',
				},
				datalabels: {
					color: '#fff',
					anchor: 'end',
					align: 'start',
					font: {
						size: 14,
						weight: 'bold',
					},
					formatter: (value) => {
						const percent = ((value / totalStudents) * 100).toFixed(2);
						return value !== 0 && percent > 0 ? `${percent}%` : '';
					},
				},
			},
			responsive: true,
			maintainAspectRatio: false,
		};

		setChartData(data);
		setChartOptions(options);
	};
	console.log(workspace.image);
	useEffect(() => {
		getRooms();
	}, [id]);

	useEffect(() => {
		roomStatus();
	}, []);

	return (
		<>
			<div className="flex justify-between items-center">
				<div className="text-4xl ml-20 font-bold">{workspace.name}</div>
			</div>

			{role == 'admin' && (
				<TabMenu
					model={items}
					activeIndex={activeIndex}
					onTabChange={(e) => setActiveIndex(e.index)}
					className="mt-10 ml-20 custom-tab-menu text-xl font-bold shadow-lg rounded-lg w-[90%]"
				/>
			)}

			{activeIndex === 0 && (
				<div>
					<div className="rounded-md p-5 flex flex-col w-[90%] m-14">
						<div className="flex gap-10">
							<div className="flex flex-col justify-center w-full overflow-hidden">
								<div className="mt-2 text-darkBlue font-semibold text-xl text-justify break-words">
									{workspace.address}
								</div>
								<div className="mt-2 text-darkBlue font-bold text-lg">
									<Rating
										value={workspace.rating}
										readOnly
										cancel={false}
										className="p-rating-item"
									/>
								</div>
								<div className="mt-2 text-darkBlue text-xl">{workspace.description}</div>
								<div className="mt-2 text-darkBlue text-xl">{`From: ${workspace.timeFrom}:00am to ${workspace.timeTo}:00pm`}</div>
							</div>
							{workspace && (
								<img
									src={`${import.meta.env.VITE_URL}/${workspace.image}`}
									className="rounded-md h-60 w-60 object-cover"
									alt="Workspace Image"
								/>
							)}
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="text-4xl ml-20 font-bold">Rooms</div>
					</div>
					<div className="flex flex-wrap w-[90%] m-14">
						{room.map((ele) => (
							<RoomCard key={ele._id} room={ele} />
						))}
					</div>

					<div className="flex justify-between items-center">
						<div className="text-4xl ml-20 font-bold">Amenities</div>
					</div>
					<div className="flex flex-wrap w-[90%] m-14">
						{workspace.amenities.map((ele) => (
							<AmenitiesCard key={ele._id} amenitie={ele} />
						))}
					</div>
				</div>
			)}
			{activeIndex === 1 && (
				<div className="flex justify-center my-5 space-x-10">
					<div className="bg-white p-5 shadow-gray-300 shadow-[3px_3px_10px_3px] rounded-md w-[90%] md:w-[40%]">
						{chartData && (
							<Chart
								type="pie"
								data={chartData}
								options={chartOptions}
								plugins={[ChartDataLabels]}
								className="w-full"
							/>
						)}
					</div>
					<div className="bg-white p-5 shadow-gray-300 shadow-[3px_3px_10px_3px] rounded-md w-[90%] md:w-[40%]">
						{chartData && (
							<Chart
								type="pie"
								data={chartData}
								options={chartOptions}
								plugins={[ChartDataLabels]}
								className="w-full"
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default WorkspaceDetail;
