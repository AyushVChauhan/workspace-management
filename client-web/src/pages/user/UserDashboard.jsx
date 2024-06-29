import { InputText } from 'primereact/inputtext';
import WorkspaceCard from '../../components/WorkspaceCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-utils';
function UserDashboard() {
	const navigate = useNavigate();
	const [workspace, setWorkspace] = useState([]);
	const [filter, setFilter] = useState('');
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

	const filteredWorkspaces = workspace.filter(
		(ele) =>
			ele.name.toLowerCase().includes(filter.toLowerCase()) ||
			ele.address.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div className="flex flex-col items-center h-screen">
			<div className="text-4xl px-10 font-bold py-1">Workspaces</div>
			<div className="w-4/5 max-w-xl mt-3">
				<span className="p-input-icon-left w-full">
					<i className="ps-4 pi pi-search" />
					<InputText
						className="ps-10 w-full p-2 rounded-full text-lg"
						placeholder="Search..."
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					/>
				</span>
			</div>
			<div className="gap-10 p-11 flex w-full flex-col justify-center items-center">
				{filteredWorkspaces.map((ele) => (
					<WorkspaceCard key={ele._id} detail={ele} />
				))}
			</div>
		</div>
	);
}

export default UserDashboard;
