import { createJSONStorage, StateStorage } from "zustand/middleware";

// Sirve para guardar en SesionStorage en lugar del LocalStorage
export const SessionStorageAPI: StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
        // console.log('getItem', name);
        const data = sessionStorage.getItem(name);
        return data;
    },
    setItem: function (name: string, value: string): void | null {
        // console.log('setItem', {name,value});
        sessionStorage.setItem(name, value);
        return null;
    },
    removeItem: function (name: string): null {
        console.log('removeItem', name);
        return null;
    }
}

export const customSessionStorage = createJSONStorage( () => SessionStorageAPI );