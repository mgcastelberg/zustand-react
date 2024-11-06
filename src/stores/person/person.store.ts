import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/sesion-storage.storage";
import { logger } from "../middlewares/logger.middleware";
import { useWeddingBoundStore } from "../wedding";

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
                storeAPI, { 
                    name: 'person-storage',
                    // storage: firebaseStorage
                }
            )
        )
    )
);

// Acceso total al state
// usePersonStore.subscribe((nextState, prevState) => {
usePersonStore.subscribe((nextState) => {
    // console.log({nextState, prevState});
    // solo hay que tener cuidado de no agregarlo en wedding por que genera un loop infinito
    const { firstName, lastName } = nextState;
    useWeddingBoundStore.getState().setFirstName( firstName );
    useWeddingBoundStore.getState().setLastName( lastName );
});
