import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const echo = new Echo({
	broadcaster: 'pusher',
	key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || 'placeholder-key',
	wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST || 'localhost',
	wsPort: Number(process.env.NEXT_PUBLIC_PUSHER_PORT) || 6001,
	wssPort: Number(process.env.NEXT_PUBLIC_PUSHER_PORT) || 6001,
	forceTLS: false,
	encrypted: false,
	disableStats: true,
	enabledTransports: ['ws', 'wss'],
	// auth: {
	// 	headers: {
	// 		Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : '',
	// 	},
	// },
});

export default echo;
