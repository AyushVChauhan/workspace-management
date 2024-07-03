import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';

function WorkspaceInsights() {
	const [roomChartData, setRoomChartData] = useState();
	const [roomChartOptions, setRoomChartOptions] = useState({});
	const [amenitiesChartData, setAmenitiesChartData] = useState();
	const [amenitiesChartOptions, setAmenitiesChartOptions] = useState({});
	const roomStatus = () => {
		const totalRooms = 100; // Example total, adjust as necessary
		const bookedCount = 60;
		const availableCount = 40;

		const documentStyle = getComputedStyle(document.documentElement);
		const data = {
			labels: ['conference room A', 'meeting room'],
			datasets: [
				{
					data: [bookedCount, availableCount],
					backgroundColor: [
						documentStyle.getPropertyValue('--yellow-500'),
						documentStyle.getPropertyValue('--green-500'),
					],
					hoverBackgroundColor: [
						documentStyle.getPropertyValue('--yellow-400'),
						documentStyle.getPropertyValue('--green-400'),
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
								((context.formattedValue / totalRooms) * 100).toFixed(2) +
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
						const percent = ((value / totalRooms) * 100).toFixed(2);
						return value !== 0 && percent > 0 ? `${percent}%` : '';
					},
				},
			},
			responsive: true,
			maintainAspectRatio: false,
		};

		setRoomChartData(data);
		setRoomChartOptions(options);
	};

	const amenitiesStatus = () => {
		const totalAmenities = 10; // Example total, adjust as necessary
		const usedCount = 2;
		const unusedCount = 3;
		const cnt = 1;

		const documentStyle = getComputedStyle(document.documentElement);
		const data = {
			labels: ['Projector', 'Coffee machine', 'Desk'],
			datasets: [
				{
					data: [usedCount, unusedCount, cnt],
					backgroundColor: [
						documentStyle.getPropertyValue('--blue-500'),
						documentStyle.getPropertyValue('--gray-500'),
						documentStyle.getPropertyValue('--yellow-500'),
					],
					hoverBackgroundColor: [
						documentStyle.getPropertyValue('--blue-400'),
						documentStyle.getPropertyValue('--gray-400'),
						documentStyle.getPropertyValue('--yellow-400'),
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
								context.formattedValue + ' (' + (context.formattedValue / totalAmenities) * 10 + ' )';
							return label;
						},
					},
				},
				title: {
					color: '#000',
					display: true,
					text: 'Amenities used',
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
						const percent = (value / totalAmenities) * 10;
						return value !== 0 && percent > 0 ? `${percent}` : '';
					},
				},
			},
			responsive: true,
			maintainAspectRatio: false,
		};

		setAmenitiesChartData(data);
		setAmenitiesChartOptions(options);
	};

	useEffect(() => {
		roomStatus();
		amenitiesStatus();
	}, []);

	return (
		<div className="flex justify-center my-5 space-x-10">
			<div className="bg-white p-5 shadow-gray-300 shadow-[3px_3px_10px_3px] rounded-md w-[90%] md:w-[40%]">
				{roomChartData && (
					<Chart
						type="pie"
						data={roomChartData}
						options={roomChartOptions}
						plugins={[ChartDataLabels]}
						className="w-full"
					/>
				)}
			</div>
			<div className="bg-white p-5 shadow-gray-300 shadow-[3px_3px_10px_3px] rounded-md w-[90%] md:w-[40%]">
				{amenitiesChartData && (
					<Chart
						type="pie"
						data={amenitiesChartData}
						options={amenitiesChartOptions}
						plugins={[ChartDataLabels]}
						className="w-full"
					/>
				)}
			</div>
		</div>
	);
}

export default WorkspaceInsights;
