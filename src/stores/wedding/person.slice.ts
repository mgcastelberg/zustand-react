import { StateCreator } from "zustand";

export interface PersonSlice {
    firstName: string;
    lastName: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
    firstName: '',
    lastName: '',
    // methods
    setFirstName: (firsName: string) => set({ firstName: firsName }),
    setLastName: (lastName: string) => set({ lastName: lastName })
});