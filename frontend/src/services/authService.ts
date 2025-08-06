import apiClient from '@/lib/api';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

class AuthService {
  // Login user
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/login', data);
      return response.data;
    } catch (error: any) {
      console.error('Error logging in:', error);
      throw new Error(error.response?.data?.error || 'Failed to login');
    }
  }

  // Register user
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/register', data);
      return response.data;
    } catch (error: any) {
      console.error('Error registering:', error);
      console.log('Error registering:', error);
      throw new Error(error.response?.data?.error || 'Failed to register');
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Failed to logout');
    }
  }

  // Get current user from token (client-side)
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  // Save user to localStorage
  saveUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Remove user from localStorage
  removeUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

// Export singleton instance
export const authService = new AuthService();