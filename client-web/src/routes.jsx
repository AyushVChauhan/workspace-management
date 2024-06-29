import { createBrowserRouter } from 'react-router-dom';
import { loginLoader, verifyLoader } from './loaders/verify-loader';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ErrorElement from './components/ErrorElement';
import Register from './pages/Register';
import Workspace from './pages/admin/Workspace';
import AddWorkSpace from './pages/admin/AddWorksapce';
import WorkspaceDetail from './pages/admin/WorkspaceDetail';
import UserDashboard from './pages/user/UserDashboard';
import UserBookings from './pages/admin/UserBookings';
import History from './pages/user/History';
import RoomStatusManagement from './pages/admin/RoomStatusManagement';
import RoomStatus from './pages/admin/RoomStatus';
import RoomBooking from './pages/user/RoomBooking';
const routes = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
		loader: loginLoader,
	},
	{
		path: '/register',
		element: <Register />,
		loader: loginLoader,
	},
	{
		path: '/admin',
		element: <Home />,
		loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [
			{ path: '', element: <Dashboard /> },
			{ path: 'workspace', element: <Workspace /> },
			{ path: 'workspace/addworkspace', element: <AddWorkSpace /> },
			{ path: 'workspace/:id', element: <WorkspaceDetail /> },
			{ path: 'userbooking', element: <UserBookings /> },
			{ path: 'workspacedetails/:id', element: <RoomStatusManagement /> },
			{ path: 'roomstatus', element: <RoomStatus /> },
		],
	},
	{
		path: '/user',
		element: <Home />,
		loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [
			{ path: '', element: <UserDashboard /> },
			{ path: 'workspace', element: <Workspace /> },
			{ path: 'workspace/:id', element: <WorkspaceDetail /> },
			{ path: 'history', element: <History /> },
			{ path: 'roomBook/:id', element: <RoomBooking /> },
			// { path: 'workspacedetails/:id', element: <RoomStatusManagement /> },
			//{ path: 'workspace', element: <Workspace /> },
			// { path: 'workspace/addworkspace', element: <AddWorkSpace /> },
		],
	},
	{
		path: '*',
		element: <ErrorElement />,
	},
]);
export default routes;
