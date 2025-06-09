'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthService from '@/services/auth';

interface HeaderProps {
	showAuth?: boolean;
}

export default function Header({ showAuth = true }: HeaderProps) {
	const [user, setUser] = useState<{ name: string } | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			if (typeof window !== 'undefined') {
				if (AuthService.isAuthenticated()) {
					const currentUser = await AuthService.getCurrentUser();
					setUser(currentUser?.user || null);
				}
				setIsLoading(false);
			}
		};
		
		checkAuth();
	}, []);

	const handleLogout = async () => {
		await AuthService.logout();
		window.location.href = '/';
	};

	return (
		<header className="home-header">
			<div className="logo">
				<Link href="/" className="logo-link">
					<span className="chess-icon">♟️</span>
					<h1>Xadrez Maroto</h1>
				</Link>
			</div>

			{showAuth && !isLoading && (
				<div className="auth-section">
					{user ? (
						<div className="user-greeting">
							<span className="greeting-text">Olá, <strong>{user.name}</strong></span>
							<button onClick={handleLogout} className="btn btn-logout">
								Sair
							</button>
						</div>
					) : (
						<div className="auth-buttons">
							<Link href="/login" className="btn btn-login">
								Login
							</Link>
							<Link href="/register" className="btn btn-register">
								Registrar
							</Link>
						</div>
					)}
				</div>
			)}
		</header>
	);
}
