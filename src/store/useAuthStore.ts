import { create } from 'zustand';

interface User {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'notary' | 'user';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('user'),
    login: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('user');
        set({ user: null, isAuthenticated: false });
    },
}));