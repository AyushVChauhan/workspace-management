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
