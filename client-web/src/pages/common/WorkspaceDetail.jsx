/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RoomCard from '../../components/RoomCard';
import { Rating } from 'primereact/rating';
import AmenitiesCard from '../../components/AmenitiesCard';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import WorkspaceInsights from '../../components/admin/WorkspaceInsights';
import useData from '../../hooks/use-data';
import Loading from '../../components/Loading';
import ErrorElement from '../../components/ErrorElement';

const WorkspaceDetail = () => {
	const { id } = useParams();
	const role = localStorage.getItem('role').toLowerCase();
	const [activeIndex, setActiveIndex] = useState(0);

	const [getWorkspaceData, workspace, loading, error] = useData(null, { url: `${role}/workspace/${id}` });

	const navigate = useNavigate();

	const items = [
		{ label: 'Basic Details', icon: 'pi pi-list', className: 'py-1 whitespace-nowrap' },
		{ label: 'Booking Insights', icon: 'pi pi-chart-line', className: 'py-1 whitespace-nowrap' },
	];

	useEffect(() => {
		getWorkspaceData();
	}, [id]);

	if (error) return <ErrorElement message={error} />;
	if (loading || !workspace) return <Loading />;

	console.log(workspace, error);

	return (
		<div>
			<div className="flex justify-between items-center">
				<div className="text-4xl font-bold">{workspace.name}</div>
				{role === 'admin' && (
					<Button
						label="Edit Workspace"
						className="bg-darkBlue rounded-md border-0"
						onClick={() => {
							navigate('/admin/workspace/edit/' + workspace._id);
						}}
					/>
				)}
			</div>

			{role === 'admin' && (
				<TabMenu
					model={items}
					activeIndex={activeIndex}
					onTabChange={(e) => setActiveIndex(e.index)}
					className="my-10 text-xl font-bold shadow-lg rounded-lg bg-white"
				/>
			)}

			{activeIndex === 0 && (
				<div className="my-5">
					<div className="rounded-xl shadow-md p-5 flex flex-col lg:flex-row gap-5 bg-white">
						<div className="rounded-xl overflow-hidden aspect-square w-full lg:w-96">
							<img
								src={`${workspace.images[0]}`}
								className="w-full object-contain"
								alt="Workspace Image"
							/>
						</div>
						<div className="w-full flex flex-col">
							<div className="text-xl line-clamp-3">{workspace.description}</div>
							<div className="mt-2 text-darkBlue font-semibold text-xl">{workspace.address}</div>
							<div className="mt-2 text-darkBlue text-xl">{`From: ${workspace.timing.from}:00 to ${workspace.timing.to}:00`}</div>
							<div className="mt-auto text-darkBlue font-bold text-lg">
								<Rating value={workspace.rating} readOnly cancel={false} className="p-rating-item" />
							</div>
						</div>
					</div>

					<div className="text-3xl mt-10 font-bold">Rooms</div>
					<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
						{workspace.rooms.map((ele) => (
							<RoomCard key={ele._id} room={ele} />
						))}
					</div>

					<div className="text-3xl mt-10 font-bold">Amenities</div>
					<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
						{workspace.amenities.map((ele) => (
							<AmenitiesCard key={ele._id} amenitie={ele} />
						))}
					</div>
				</div>
			)}
			{activeIndex === 1 && <WorkspaceInsights />}
		</div>
	);
};

export default WorkspaceDetail;
