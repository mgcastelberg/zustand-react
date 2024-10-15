import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';
// import { produce } from 'immer';
import { immer } from "zustand/middleware/immer";

interface TaskState {

    tasks: Record<string,Task>; //{[key:string]:Task}
    draggingTaskId?: string;

    getTaskByStatus: (status: TaskStatus) => Task[];
    addTask: (title: string, status: TaskStatus) => void;
    setDraggedTaskId: (taskId: string) => void;
    removeDraggedTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: ( status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
    draggingTaskId: undefined,
    tasks:{
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
    },

    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values( tasks ).filter( task => task.status === status );
    },
    addTask: (title: string, status: TaskStatus) => {
        const newTask = { id: uuidv4(), title, status };

        //? immer incluido en los middlewares
        set( state => {
            state.tasks[newTask.id] = newTask; // codigo mutante
        });

        // immer se puede usar en cualquier lugar que se use el spread - codigo mutante
        //? Requiere el npm package immer
        // set( produce((state: TaskState) => {
        //     state.tasks[newTask.id] = newTask;
        // }))

        //? Forma nativa del zustand
        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [newTask.id]: newTask
        //     }
        // }))
    },
    setDraggedTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId });
    },
    removeDraggedTaskId: () => {
        set({ draggingTaskId: undefined });
    },
    changeTaskStatus: (taskId: string, status: TaskStatus) => {
        
        //? immer incluido en los middlewares
        set( state => {
            state.tasks[taskId] = {
                ...state.tasks[taskId],
                status
            }; // codigo mutante
        });
        
        // const tasks = get().tasks[taskId];
        // tasks.status = status; 
        // set((state) =>({
        //     tasks:{
        //         ...state.tasks, //hacemos el spread para no perder las otras tareas
        //         [taskId]:tasks
        //     }
        // }));
    },
    onTaskDrop: ( status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if( !taskId ) return;
        get().changeTaskStatus(taskId, status);
        get().removeDraggedTaskId();
    }
})

export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer( storeApi )
        ,{name:'task-storage'})
    )
);