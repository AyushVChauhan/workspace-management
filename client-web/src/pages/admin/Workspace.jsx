import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import WorkspaceCard from '../../components/WorkspaceCard';
import useData from '../../hooks/use-data';
import { ProgressSpinner } from 'primereact/progressspinner';

const Workspace = () => {
	const navigate = useNavigate();
	const role = localStorage.getItem('role').toLowerCase();
	const [getWorkspace, workspace, loading, error] = useData([], { url: `${role}/workspace` });

	useEffect(() => {
		getWorkspace();
	}, []);

	let component = <></>;
	if (loading)
		component = (
			<div className="w-full text-center py-10">
				<ProgressSpinner />
			</div>
		);
	else if (error) component = <div className="text-red-600 text-center w-full text-xl">{error}</div>;
	else
		component = (
			<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{workspace.map((ele) => (
					<WorkspaceCard key={ele._id} detail={ele} />
				))}
			</div>
		);

	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<div className="text-4xl font-bold">Workspaces</div>
				<Button
					onClick={() => navigate('add')}
					className="bg-darkBlue border-0 rounded-md"
					label="ADD WORKSPACE"
				/>
			</div>
			{component}
		</div>
	);
};

export default Workspace;
