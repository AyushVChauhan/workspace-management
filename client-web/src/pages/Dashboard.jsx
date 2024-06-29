/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../utils/fetch-utils';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

import { FaUser } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';

import CountCard from '../components/Dashboard/CountCard';

function Dashboard() {
	const role = localStorage.getItem('role').toLowerCase();
	const [count, setCount] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const getData = async () => {
		const result = await fetchGet(role + '/dashboard', localStorage.getItem('token'));
		if (result.success) {
			let data = {
				'ADMIN': [
					{
						label: 'Workspaces',
						count: result.data.workspaceCount,
						iconClass: <BsPersonWorkspace size={25} />,
					},
					{
						label: 'Users',
						count: result.data.userCount,
						iconClass: <FaUser size={25} />,
					},
				],
				'USER': [],
			};
			setCount(data);
		} else {
			navigate('/');
		}
		setLoading(false);
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{loading && <Loading />}
			<div className="text-4xl px-10 font-bold py-1">Dashboard</div>

			<div className="flex overflow-hidden flex-wrap justify-evenly">
				{count &&
					count[localStorage.getItem('role')].map((ele, ind) => {
						return <CountCard key={ind} label={ele.label} iconClass={ele.iconClass} count={ele.count} />;
					})}
			</div>
		</>
	);
}

export default Dashboard;
