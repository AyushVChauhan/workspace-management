import { InputText } from 'primereact/inputtext';
import WorkspaceCard from '../../components/WorkspaceCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-utils';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
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
		<div>
			<div className="flex flex-row justify-between">
				<div className="text-4xl font-bold">Workspaces</div>
				<div className="w-1/2">
					<IconField iconPosition="left">
						<InputIcon className="pi pi-search"> </InputIcon>
						<InputText
							className="w-full rounded-full text-lg"
							onChange={(e) => setFilter(e.target.value)}
							placeholder="Search"
							value={filter}
						/>
					</IconField>
				</div>
			</div>
			<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
				{filteredWorkspaces.map((ele) => (
					<WorkspaceCard key={ele._id} detail={ele} />
				))}
			</div>
		</div>
	);
}

export default UserDashboard;
