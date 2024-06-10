import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist, StateStorage } from "zustand/middleware";
// import { customSessionStorage } from "../storages/sesion-storage.storage";
import { firebaseStorage } from "../storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (value:string) => void;
    setLastName: (value:string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]] > = (set) => ({
    firstName:'',
    lastName:'',
    setFirstName: (value:string) => set( ({ firstName:value }), false, 'setFirstName' ),
    setLastName: (value:string) => set( ({ lastName:value }), false, 'setLastName' ),
});

// Unimos las 2 interfaces
// Anidar varios middlewares
export const usePersonStore = create<PersonState & Actions>()( 
    logger(
        devtools(
            persist(
                storeAPI
            ,{ 
                name: 'person-storage',
                // storage: firebaseStorage
            })
        )
    )
);
