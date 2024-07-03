/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { fetchPost } from '../../utils/fetch-utils';

function DaySelection({ roomId, timing, date, next, roomPrice }) {
	const [selectedDate, setSelectedDate] = useState(date);
	const [selectedTime, setSelectedTime] = useState(timing);
	const [availableHours, setAvailableHours] = useState([]);

	const fetchAvailability = useCallback(
		async (date) => {
			setSelectedTime({ from: null, to: null });
			setAvailableHours([]);
			if (!date) {
				return;
			}
			const result = await fetchPost(
				'user/booking/availability/' + roomId,
				localStorage.getItem('token'),
				JSON.stringify({ date })
			);
			console.log(result);
			if (result.success) {
				setAvailableHours(result.data);
			}
		},
		[roomId]
	);

	const handleDateChange = (e) => {
		setSelectedDate(e.value);
		fetchAvailability(e.value);
	};

	useEffect(() => {
		fetchAvailability(date);
	}, [date]);

	const handleCheckboxChange = (index) => {
		if (selectedTime.from === null) {
			setSelectedTime({ from: availableHours[index].time.from, to: availableHours[index].time.to });
			return;
		}
		const isSelected =
			selectedTime.from <= availableHours[index].time.from && selectedTime.to >= availableHours[index].time.to;
		if (isSelected) {
			setSelectedTime({ from: null, to: null });
			return;
		}

		const newFrom = Math.min(selectedTime.from, availableHours[index].time.from);
		const newTo = Math.max(selectedTime.to, availableHours[index].time.to);
		const continuous = availableHours.every((slot) => {
			if (slot.time.from >= newFrom && slot.time.to <= newTo) {
				if (slot.available) return true;
				else return false;
			}
			return true;
		});

		if (continuous) {
			setSelectedTime({ from: newFrom, to: newTo });
		}
	};

	const goNext = () => {
		if (selectedTime.from == null || selectedTime.to == null) return;
		next(selectedTime, selectedDate);
	};

	return (
		<>
			<div className="flex flex-col lg:flex-row">
				<div className="w-full">
					<label htmlFor="datePicker" className="text-lg m-3 block">
						Select Date:
					</label>
					<Calendar
						className="w-full"
						minDate={new Date()}
						id="datePicker"
						value={selectedDate}
						onChange={handleDateChange}
						inline
					/>
				</div>
				<div className="w-full">
					<label className="text-lg m-3 block">Select Hours:</label>
					<div className="flex flex-row flex-wrap gap-x-3">
						{availableHours.map((hour, index) => (
							<div
								key={index}
								className="p-4 flex items-center"
								style={{
									filter: hour.available ? 'none' : 'blur(1px)',
								}}
							>
								<Checkbox
									inputId={'hour' + index}
									disabled={!hour.available}
									onChange={() => handleCheckboxChange(index)}
									checked={
										selectedTime.from !== null &&
										hour.time.from >= selectedTime.from &&
										hour.time.to <= selectedTime.to
									}
								/>
								<label
									htmlFor={'hour' + index}
									className="px-5"
									style={{
										borderRadius: '20px',
										padding: '4px 12px',
										display: 'inline-block',
										marginLeft: '10px',
										backgroundColor: hour.available ? '#d3f2e2' : '#f0a1a8',
									}}
								>
									{hour.time.from}.00 - {hour.time.to}.00
								</label>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="text-end">
				<Button
					className="bg-darkBlue border-0 rounded-md"
					label={`Next - ${roomPrice * (selectedTime.to - selectedTime.from)} $`}
					onClick={goNext}
				/>
			</div>
		</>
	);
}

export default DaySelection;
