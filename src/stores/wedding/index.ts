import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";
import { createGuestSlice, GuestSlice } from "./guest.slice";

// Crear el store de wedding
type ShareState = PersonSlice & GuestSlice;

export const useWeddingBoundStore = create<ShareState>()(
    devtools(
        (...a) => ({ //rest porque estamos dentro de un argumento
            ...createPersonSlice(...a), // spread
            ...createGuestSlice(...a),
        })
    )
)