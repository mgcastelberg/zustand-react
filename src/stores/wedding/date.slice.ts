import { StateCreator } from "zustand";

export interface DateSlice {
    eventDate: Date;
    eventYYYYMMDD: () => string;
    eventHHMM: () => string;

    setEventDate: (partialDate:string) => void;
    setEventTime: (partialTime:string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
    eventDate: new Date(),
    eventYYYYMMDD: () => {
        return get().eventDate.toISOString().split('T')[0];
    },
    eventHHMM: () => {
        const hours = get().eventDate.getHours().toString().padStart(2, '0');
        const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    },

    setEventDate: (partialDate: string) => set( state =>{
        const date = new Date(partialDate);
        const year = date.getFullYear();
        const month = date.getMonth()  + 1;
        const day = date.getDate() + 1;

        const newDate = new Date( state.eventDate ); // no accedemos directo por que lo mutariamos el eventDate (copiando)
        newDate.setFullYear(year, month - 1, day); // el setFullYear nos permite pasarle toda la fecha yyyy-mm-dd
        // console.log({ year, month, day });
        // console.log(newDate);
        return { eventDate: newDate };
    }),

    setEventTime: (partialTime: string) => set( state =>{
        const [hours, minutes] = partialTime.split(':');
        const newDate = new Date( state.eventDate ); // no accedemos directo por que lo mutariamos el eventDate (copiando)
        newDate.setHours(parseInt(hours), parseInt(minutes),parseInt('0'));
        // console.log({ hours, minutes });
        // console.log(newDate);
        return { eventDate: newDate };
    }),
})