import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";

// Crear el store de wedding
type ShareState = PersonSlice

export const useWeddiingStore = create<ShareState>()(
    (...a) => ({ //rest porque estamos dentro de un argumento
        ...createPersonSlice(...a) // spread
    })
)