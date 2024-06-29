import { Dialog } from 'primereact/dialog';
import { useRef } from 'react';

function HistoryPreview({ onClose, workspace, room, date, from, to, address, amount, amenities, qty }) {
	console.log(amenities);
	const headerElement = (
		<div>
			<div className="text-3xl font-bold flex justify-center text-darkBlue">Details</div>
		</div>
	);
	return (
		<>
			<Dialog
				header={headerElement}
				visible={true}
				style={{ width: '35vw' }}
				draggable={false}
				onHide={() => onClose()}
			>
				<div>
					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Workspace Name:</div>
						<div className="ms-2 mt-2">{workspace}</div>
					</div>
					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Address:</div>
						<div className="ms-2 mt-2">{address}</div>
					</div>
					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Room:</div>
						<div className="ms-2 mt-2">{room}</div>
					</div>
					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Date:</div>
						<div className="ms-2 mt-2">{date}</div>
					</div>
					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Time:</div>
						<div className="ms-2 mt-2">
							{from}:00-{to}:00
						</div>
					</div>
					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Amount:</div>
						<div className="ms-2 mt-2">{amount}$</div>
					</div>
					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Amenities used:</div>
						<div className="ms-2 mt-2">Projector - 1</div>
					</div>

					{/* {amenities.length > 0 && (
						<div>
							<div className="ms-2 mt-3 font-xl font-semibold text-darkBlue">Amenitiess used:</div>
							<ol className="custom ms-10 mt-2">
								{amenities.map((ele, index) => (
									<li key={index} className="">
										{ele}
									</li>
								))}
							</ol>
						</div>
					)} */}
				</div>
			</Dialog>
		</>
	);
}

export default HistoryPreview;
