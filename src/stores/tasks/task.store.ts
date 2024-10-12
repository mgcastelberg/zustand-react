import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

interface TaskState {

    tasks: Record<string,Task>; //{[key:string]:Task}
    draggingTaskId?: string;

    getTaskByStatus: (status: TaskStatus) => Task[];
    setDraggedTaskId: (taskId: string) => void;
    removeDraggedTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
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
    setDraggedTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId });
    },
    removeDraggedTaskId: () => {
        set({ draggingTaskId: undefined });
    },
    changeTaskStatus: (taskId: string, status: TaskStatus) => {
        
        const tasks = get().tasks[taskId];
        tasks.status = status;
        
        set((state) =>({
            tasks:{
                ...state.tasks, //hacemos el spread para no perder las otras tareas
                [taskId]:tasks
            }
        }));
    }
})

export const useTaskStore = create<TaskState>()(
    devtools(
        storeApi
    )
);