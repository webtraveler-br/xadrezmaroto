'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import AuthService from '@/services/auth';

import '@/styles/register.scss';

export default function Register() {
	const router = useRouter();
	const [isPageLoading, setIsPageLoading] = useState(true);
	
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (AuthService.isAuthenticated()) {
				router.push('/');
			} else {
				setIsPageLoading(false);
			}
		}
	}, [router]);
	
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [generalError, setGeneralError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) {
			newErrors.name = 'O nome é obrigatório';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'O email é obrigatório';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {		// Limpa o erro do campo quando o usuário começa a digitar novamente

			newErrors.email = 'Email inválido';
		}

		if (!formData.password) {
			newErrors.password = 'A senha é obrigatória';
		} else if (formData.password.length < 8) {
			newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
		}

		if (!formData.password_confirmation) {
			newErrors.password_confirmation = 'Confirme sua senha';
		} else if (formData.password !== formData.password_confirmation) {
			newErrors.password_confirmation = 'As senhas não conferem';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setGeneralError('');
		setErrors({});

		if (!validateForm()) return;

		setIsLoading(true);

		try {
			const result = await AuthService.register(formData);

			if (result.success) {
				router.push('/');
			} else if (result.error) {
				if (result.error.errors) {
					const backendErrors: Record<string, string> = {};
					Object.entries(result.error.errors).forEach(([key, value]) => {
						backendErrors[key] = Array.isArray(value) ? value[0] : String(value);
					});
					setErrors(backendErrors);
				} else {
					setGeneralError(result.error.message || 'Ocorreu um erro ao registrar. Tente novamente.');
				}
			} else {
				setGeneralError('Ocorreu um erro desconhecido. Tente novamente mais tarde.');
			}
		} catch (error) {
			console.error('Erro inesperado:', error);
			setGeneralError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
		} finally {
			setIsLoading(false);
		}
	};

	if (isPageLoading) {
		return (
			<div className="register-container">
				<div className="loading-container">
					<div className="loading-spinner"></div>
					<p>Carregando...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="register-container">
			<Header />

			<main>
				<div className="register-card">
					<h1>Criar conta</h1>

					{generalError && <div className="general-error">{generalError}</div>}

					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Nome</label>
							<input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome completo" className={errors.name ? 'error' : ''} disabled={isLoading} />
							{errors.name && <span className="error-message">{errors.name}</span>}
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu.email@exemplo.com" className={errors.email ? 'error' : ''} disabled={isLoading} />
							{errors.email && <span className="error-message">{errors.email}</span>}
						</div>

						<div className="form-group">
							<label htmlFor="password">Senha</label>
							<input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mínimo de 8 caracteres" className={errors.password ? 'error' : ''} disabled={isLoading} />
							{errors.password && <span className="error-message">{errors.password}</span>}
						</div>

						<div className="form-group">
							<label htmlFor="password_confirmation">Confirmar senha</label>
							<input
								type="password"
								id="password_confirmation"
								name="password_confirmation"
								value={formData.password_confirmation}
								onChange={handleChange}
								placeholder="Repita sua senha"
								className={errors.password_confirmation ? 'error' : ''}
								disabled={isLoading}
							/>
							{errors.password_confirmation && <span className="error-message">{errors.password_confirmation}</span>}
						</div>

						<div className="form-footer">
							<Button type="submit" variant="register" className="register-button" disabled={isLoading}>
								{isLoading ? 'Registrando...' : 'Criar conta'}
							</Button>

							<div className="login-link">
								Já tem uma conta?
								<Link href="/login">Fazer login</Link>
							</div>
						</div>
					</form>
				</div>
			</main>

			<Footer />
		</div>
	);
}
