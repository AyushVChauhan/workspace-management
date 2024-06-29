import React from 'react';
import { Rating } from 'primereact/rating';
import { useNavigate } from 'react-router-dom';
const WorkspaceCard = ({ detail }) => {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();
	return (
		<>
			<div
				onClick={() => {
					navigate(`/${role}/workspace/${detail._id}`);
				}}
				className="p-3 py-4 cursor-pointer shadow-md gap-10 rounded-xl justify-center items-center flex  flex-col  w-full"
			>
				<div className="flex justify-evenly w-full items-center">
					<div className="flex-shrink-0">
						<img
							src={`/${detail.images[0]}`}
							className="w-60 h-60 p-4 object-contain"
							alt="Workspace Image"
						/>
					</div>
					<div className="overflow-hidden gap-5 flex flex-col ">
						<span className=" text-3xl font-semibold text-darkBlue">{detail.name}</span>
						<span className=" text-xl text-ellipsis text-darkBlue   overflow-hidden whitespace-nowrap">
							{detail.address}
						</span>
						<span className="">
							<Rating value={detail.rating} readOnly cancel={false} className="p-rating-item" />
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default WorkspaceCard;
