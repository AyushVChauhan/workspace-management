/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../utils/fetch-utils';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

import { FaChalkboardTeacher, FaRegCalendarCheck, FaRegCalendarPlus, FaSchool } from 'react-icons/fa';
import { PiChalkboardTeacherFill, PiStudentBold } from 'react-icons/pi';
import { MdOutlineMenuBook } from 'react-icons/md';

import CountCard from '../components/Dashboard/CountCard';
import { LuCalendarCheck2, LuCalendarClock } from 'react-icons/lu';
import { TbCalendarTime } from 'react-icons/tb';

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
						label: 'Institutes',
						count: result.data.count1,
						iconClass: <FaSchool size={25} />,
					},
					{
						label: 'Teachers',
						count: result.data.count2,
						iconClass: <FaChalkboardTeacher size={25} />,
					},
					{
						label: 'Students',
						count: 300,
						iconClass: <PiStudentBold size={25} />,
					},
					{
						label: 'Quiz Given',
						count: 50,
						iconClass: <FaSchool size={25} />,
					},
					{
						label: 'Quiz Pending',
						count: 70,
						iconClass: <FaSchool size={25} />,
					},
				],
				'INSTITUTE-HEAD': [
					{
						label: 'Departments',
						count: result.data.departmentCount,
						iconClass: <FaSchool size={25}></FaSchool>,
					},
					{
						label: 'Teachers',
						count: result.data.teacherCount,
						iconClass: <PiChalkboardTeacherFill size={25}></PiChalkboardTeacherFill>,
					},
					{
						label: 'Subjects',
						count: result.data.subjectCount,
						iconClass: <MdOutlineMenuBook size={25} />,
					},
				],
				'DEPARTMENT-HEAD': [
					{
						label: 'Students',
						count: result.data.students,
						iconClass: <FaSchool size={25} />,
					},
				],
				'TEACHER': [
					{
						label: 'Completed Quiz',
						count: result.data.completedQuizCount,
						iconClass: <FaRegCalendarCheck size={25} />,
					},
					{
						label: 'Available Quiz',
						count: result.data.availableQuizCount,
						iconClass: <FaRegCalendarPlus size={25} />,
					},
					{
						label: 'Upcoming Quiz',
						count: result.data.upcomingQuizCount,
						iconClass: <LuCalendarClock size={25} />,
					},

					{
						label: 'Subjects',
						count: result.data.subjectCount,
						iconClass: <FaSchool size={25} />,
					},
				],
				'STUDENT': [
					{
						label: 'Upcoming Quiz',
						count: result.data.upcomingQuiz,
						iconClass: <TbCalendarTime size={25} />,
					},
					{
						label: 'Available Quiz',
						count: result.data.availableQuiz,
						iconClass: <LuCalendarCheck2 size={25} />,
					},
				],
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
