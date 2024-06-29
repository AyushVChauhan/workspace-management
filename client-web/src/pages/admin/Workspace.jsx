import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import WorkspaceCard from '../../components/WorkspaceCard';
import { fetchGet } from '../../utils/fetch-utils';

const Workspace = () => {
	const navigate = useNavigate();
	const [workspace, setWorkspace] = useState([]);
	const role = localStorage.getItem('role').toLowerCase();

	const getWorkspace = async () => {
		const result = await fetchGet(`${role}/workspace`, localStorage.getItem('token'));
		if (result.success) {
			setWorkspace(result.data);
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		getWorkspace();
	}, []);

	return (
		<div className="px-10">
			<div className="flex justify-between items-center">
				<div className="text-4xl font-bold">Workspaces</div>
				<Button
					onClick={() => navigate('addworkspace')}
					className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
				>
					ADD WORKSPACE
				</Button>
			</div>
			<div className="gap-10 p-11 flex w-full flex-col justify-center items-center">
				{workspace.map((ele) => (
					<WorkspaceCard key={ele._id} detail={ele} />
				))}
			</div>
		</div>
	);
};

export default Workspace;
