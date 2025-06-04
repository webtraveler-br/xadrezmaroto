import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
	children: ReactNode;
	variant?: 'primary' | 'secondary' | 'login' | 'register' | 'play';
	href?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	disabled?: boolean;
}

export default function Button({ children, variant = 'primary', href, onClick, type = 'button', className = '', disabled = false }: ButtonProps) {
	const baseClass = `btn btn-${variant} ${className}`;

	if (href) {
		return (
			<Link href={href} className={baseClass}>
				{children}
			</Link>
		);
	}

	return (
		<button type={type} className={baseClass} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}
