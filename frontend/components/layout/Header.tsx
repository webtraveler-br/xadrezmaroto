import Link from 'next/link';

interface HeaderProps {
	showAuth?: boolean;
}

export default function Header({ showAuth = true }: HeaderProps) {
	return (
		<header className="home-header">
			<div className="logo">
				<span className="chess-icon">♟️</span>
				<h1>Xadrez Maroto</h1>
			</div>

			{showAuth && (
				<div className="auth-buttons">
					<Link href="/login" className="btn btn-login">
						Login
					</Link>
					<Link href="/register" className="btn btn-register">
						Registrar
					</Link>
				</div>
			)}
		</header>
	);
}
