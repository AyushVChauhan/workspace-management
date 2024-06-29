import { Button } from 'primereact/button';
import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';

function DaySelection() {
	const [selectedDate, setSelectedDate] = useState(null);
	const [availableHours, setAvailableHours] = useState([]);

	// Placeholder function to simulate API call for availability based on selected date
	const fetchAvailability = (date) => {
		// Replace with actual API call logic
		const availabilityData = [
			{ time: '10-11', available: true },
			{ time: '11-12', available: false },
			{ time: '12-1', available: true },
			{ time: '1-2', available: true },
		];
		setAvailableHours(availabilityData);
	};

	const handleDateChange = (e) => {
		setSelectedDate(e.value);
		fetchAvailability(e.value);
	};

	const handleHourSelect = (hour) => {
		// Handle hour selection logic
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
					<div>
						{availableHours.map((hour) => (
							<Checkbox
								key={hour.time}
								inputId={hour.time}
								disabled={!hour.available}
								onChange={(e) => handleHourSelect(hour)}
								checked={false}
								className="p-mr-2"
								label={hour.time}
							/>
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
