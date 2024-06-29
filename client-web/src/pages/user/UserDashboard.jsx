import React from 'react';
import { InputText } from 'primereact/inputtext';
import WorkspaceCard from '../../components/WorkspaceCard';

function UserDashboard() {
	return (
		<div className="flex flex-col items-center h-screen">
			<div className="w-4/5 max-w-xl mt-2">
				<span className="p-input-icon-left w-full">
					<i className="ps-4 pi pi-search" />
					<InputText className="w-full p-2 rounded-full text-lg" placeholder="Search..." />
				</span>
			</div>
		</div>
	);
}

export default UserDashboard;
