import axios from 'axios';

function getToken() {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('token');
	}
	return null;
}

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default api;
