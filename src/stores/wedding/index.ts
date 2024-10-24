import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { createConfirmationSlice, ConfirmationSlice } from "./confirmation.slice";

// Crear el store de wedding
type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<ShareState>()(
    devtools(
        (...a) => ({ //rest porque estamos dentro de un argumento
            ...createPersonSlice(...a), // spread
            ...createGuestSlice(...a),
            ...createDateSlice(...a),
            ...createConfirmationSlice(...a),
        })
    )
)