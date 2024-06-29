import { Button } from 'primereact/button';
import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { fetchGet } from '../../utils/fetch-utils';

function DaySelection() {
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedHour, setSelectedHour] = useState(null);
	const [availableHours, setAvailableHours] = useState([]);

	const fetchAvailability = async (date) => {
		setAvailableHours(null);
		if (date) {
			const result = await fetchGet('booking/availability/' + roomId, localStorage.getItem('token'));
			if (result.success) {
				//
			}
		}

		setAvailableHours(availabilityData);
	};
	const handleDateChange = (e) => {
		setSelectedDate(e.value);
		fetchAvailability(e.value);
	};

	const handleHourSelect = (hour) => {
		// Handle hour selection logic
		setSelectedHour(hour);
		console.log('Selected hour:', hour);
		console.log('Selected hour:', hour);
	};

	return (
		<div className="p-grid p-fluid">
			<div className="p-col-12">
				<div className="p-field">
					<label htmlFor="datePicker" className="text-lg m-3">
						Select Date:
					</label>
					<Calendar
						className="m-3"
						id="datePicker"
						value={selectedDate}
						onChange={handleDateChange}
						inline
						showWeek
					/>
				</div>
				<div className="p-field">
					<label>Available Hours:</label>
					<div className="p-grid">
						{availableHours.map((hour) => (
							<div className="p-col-3" key={hour.time}>
								<div
									className="p-p-2"
									style={{
										borderRadius: '20px',
										padding: '8px',
										margin: '10px',
										filter: hour.available ? 'none' : 'blur(1px)',
									}}
								>
									<Checkbox
										inputId={hour.time}
										disabled={!hour.available}
										onChange={() => handleHourSelect(hour)}
										checked={selectedHour === hour}
										className="p-mr-2"
										style={{ marginTop: '4px' }}
									/>
									<label
										htmlFor={hour.time}
										style={{
											color: 'black',
											borderRadius: '20px',
											padding: '4px 12px',
											display: 'inline-block',
											marginLeft: '10px',
											backgroundColor: hour.available ? '#d3f2e2' : '#f0a1a8',
										}}
									>
										{hour.time}
									</label>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex justify-end">
					<Button className="bg-darkBlue">Next</Button>
				</div>
			</div>
		</div>
	);
}

export default DaySelection;
