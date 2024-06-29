import { redirect } from 'react-router-dom';
import { fetchGet } from '../utils/fetch-utils';
export const loginLoader = async () => {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');
	if (!token || !role) {
		return null;
	} else {
		return redirect('/' + role.toLowerCase());
	}
};
export const verifyLoader = async () => {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');
	if (!token || !role) {
		return redirect('/');
	} else {
		const result = await fetchGet(role.toLowerCase() + '/verify', token);
		if (result.success && result.data.role == role) {
			localStorage.setItem('username', result.data.username);
			localStorage.setItem('role', result.data.role);
			return null;
		} else {
			localStorage.clear();
			return redirect('/');
		}
	}
};
