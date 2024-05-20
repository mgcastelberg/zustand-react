import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = 'https://cursoangular-19081.firebaseio.com/zustand';

// Sirve para guardar en Firebase en lugar del SesionStorage o el LocalStorage
const storageAPI: StateStorage = {

    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${ firebaseUrl}/${name}.json`).then( res => res.json() );
            return JSON.stringify(data);
        } catch (error) {
            throw new Error("No se conecto a firebase");
        }
    },
    setItem: async function (name: string, value: string): Promise<void>{
        const data = await fetch(`${ firebaseUrl}/${name}.json`,{
            method:'PUT',
            body: value
        }).then( res => res.json() );
        console.log(data);
        return;
    },
    removeItem: function (name: string): null {
        console.log('removeItem', name);
        return null;
    }
}

export const firebaseStorage = createJSONStorage( () => storageAPI );