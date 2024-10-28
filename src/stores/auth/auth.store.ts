import { StateCreator } from "zustand";
import { AuthStatus, User } from "../../interfaces";


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
}

// Definimos espacio en memoria para el store
export const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'unauthorized',
    token: undefined,
    user: undefined,
    // setAuthStatus: (status: AuthStatus) => set({ status }),
    // setToken: (token: string) => set({ token }),
    // setUser: (user: User) => set({ user }),
})