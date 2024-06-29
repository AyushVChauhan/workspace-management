import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
const Workspace = () => {
	const navigate = useNavigate();
	return (
		<div className="px-10">
			<div className="flex justify-between items-center">
				<div className="text-4xl font-bold">Workspaces</div>
				<Button
					onClick={() => {
						navigate('addworkspace');
					}}
					className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
				>
					ADD WORKSPACE
				</Button>
			</div>
		</div>
	);
};

export default Workspace;
