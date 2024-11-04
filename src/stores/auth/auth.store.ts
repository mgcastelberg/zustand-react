import { create, StateCreator } from "zustand";
import { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    loginUser: (email:string,password:string) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
}

// Definimos espacio en memoria para el store
const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'pending',
    token: undefined,
    user: undefined,
    // Methods
    loginUser: async (email:string,password:string) => {
        try {
            const { token, ...user } = await AuthService.login(email,password);            
            set({ status: 'authorized', token, user });
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined });
            throw 'Ubauthorized';
        }
    },
    checkAuthStatus: async () => {
        try {
            const { token, ...user } = await AuthService.checkStatus();            
            set({ status: 'authorized', token, user });
        } catch (error) {
            set({ status: 'unauthorized', token: undefined, user: undefined });
            throw 'Unauthorized';
        }
    },
    
});

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            storeApi,
            { name: 'auth-storage' }
        )
    )
);