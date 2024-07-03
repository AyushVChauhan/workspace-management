/* eslint-disable react/prop-types */
import { Rating } from 'primereact/rating';
import { useNavigate } from 'react-router-dom';
const WorkspaceCard = ({ detail }) => {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();
	return (
		<div
			onClick={() => {
				navigate(`/${role}/workspace/${detail._id}`);
			}}
			className="p-3 cursor-pointer shadow-md rounded-xl w-full bg-white"
		>
			<div className="w-full overflow-hidden rounded-xl aspect-square">
				<img src={`${detail.images[0]}`} className="w-full object-contain" alt="Workspace Image" />
			</div>
			<div className="mt-3">
				<div className="text-2xl font-semibold text-darkBlue">{detail.name}</div>
				<div className="text-ellipsis font-semibold line-clamp-2">{detail.address}</div>
				<div className="text-ellipsis line-clamp-3 mt-3">{detail.description}</div>
				<Rating value={detail.rating} readOnly cancel={false} className="mt-3" />
			</div>
		</div>
	);
};

export default WorkspaceCard;
