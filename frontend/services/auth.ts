/**
 * Serviço de autenticação para gerenciar login, registro e sessão do usuário
 */
import api from './api';

export interface RegisterData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface LoginData {
	email: string;
	password: string;
	remember?: boolean;
}

export interface AuthResponse {
	user: {
		id: number;
		name: string;
		email: string;
	};
	token: string;
	status: string;
}

export interface ApiError {
	message: string;
	errors?: Record<string, string[]>;
}

const TOKEN_KEY = 'auth_token';

const AuthService = {
	/**
	 * Registra um novo usuário
	 * @param data Dados de registro do usuário
	 * @returns Promessa com resposta da operação ou erro
	 */
	async register(data: RegisterData): Promise<{ success: boolean; data?: AuthResponse; error?: ApiError }> {
		try {
			const response = await api.post('/auth/register', data);

			if (response.data.token) {
				this.setToken(response.data.token);
			}

			return { success: true, data: response.data };
		} catch (error: any) {
			const apiError: ApiError = {
				message: error.response?.data?.message || 'Erro ao registrar usuário',
				errors: error.response?.data?.errors,
			};

			return { success: false, error: apiError };
		}
	},

	/**
	 * Realiza login do usuário
	 * @param data Credenciais de login
	 * @returns Promessa com resposta da operação ou erro
	 */
	async login(data: LoginData): Promise<{ success: boolean; data?: AuthResponse; error?: ApiError }> {
		try {
			const response = await api.post('/auth/login', data);

			if (response.data.token) {
				this.setToken(response.data.token);
			}

			return { success: true, data: response.data };
		} catch (error: any) {
			const apiError: ApiError = {
				message: error.response?.data?.message || 'Erro ao fazer login',
				errors: error.response?.data?.errors,
			};

			return { success: false, error: apiError };
		}
	},

	/**
	 * Realiza logout do usuário
	 * @returns Resposta da operação de logout
	 */
	async logout() {
		try {
			if (this.getToken()) {
				await api.post('/auth/logout');
			}
		} catch (error) {
			console.error('Erro ao fazer logout na API:', error);
		} finally {
			this.removeToken();
		}
	},

	/**
	 * Obtém os dados do usuário atual
	 */
	async getCurrentUser() {
		if (!this.getToken()) return null;

		try {
			const response = await api.get('/auth/user');
			return response.data;
		} catch (error) {
			// Se houver erro na requisição (token inválido/expirado), remove o token
			this.removeToken();
			return null;
		}
	},

	/**
	 * Verifica se o usuário está autenticado
	 * @returns boolean indicando se o usuário está autenticado
	 */
	isAuthenticated(): boolean {
		return !!this.getToken();
	},

	/**
	 * Armazena o token de autenticação
	 * @param token Token JWT
	 */
	setToken(token: string): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem(TOKEN_KEY, token);
		}
	},

	/**
	 * Obtém o token armazenado
	 * @returns Token JWT ou null
	 */
	getToken(): string | null {
		if (typeof window !== 'undefined') {
			return localStorage.getItem(TOKEN_KEY);
		}
		return null;
	},

	/**
	 * Remove o token armazenado
	 */
	removeToken(): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem(TOKEN_KEY);
		}
	},
};

export default AuthService;
