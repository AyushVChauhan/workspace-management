import { Button } from 'primereact/button';

function RoomCard() {
	return (
		<div className="bg-white shadow-lg rounded-md m-5 p-5 flex w-80 overflow-hidden">
			<img src="vite.svg" className="rounded-md h-24 w-24 object-cover"></img>
			<div className="ml-5 flex flex-col justify-between w-full overflow-hidden">
				<div>
					<div className="text-darkBlue font-bold text-xl text-center">Room1</div>
					<div className="mt-2 text-darkBlue font-semibold text-sm text-justify break-words">
						vckgclucguxbhwldhbqyeduqgbccieogfcug cvuegcc ouogb
					</div>
					<div className="mt-2 text-darkBlue font-bold text-lg">Price: 100</div>
					<div className="mt-2 text-darkBlue font-bold text-lg">Ratings: 4.5</div>
				</div>
				<Button className="bg-darkBlue text-white font-bold py-2 px-4 rounded mt-4 self-end">+ Book</Button>
			</div>
		</div>
	);
}

export default RoomCard;
