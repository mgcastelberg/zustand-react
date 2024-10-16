import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options { // Regularmente cuando es un Hook se pone Options en lugar de interface
    status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
    
    const isDragging = useTaskStore( state => !!state.draggingTaskId ); // para tomarlo como un booleano
    const onTaskDrop = useTaskStore( state => state.onTaskDrop );
    const addTask = useTaskStore( state => state.addTask );

    const [onDragOver, setOnDragOver] = useState(false);
    // console.log(isDragging);

    const  handleAddTask = async () => {

        const { isConfirmed, value } = await Swal.fire({
            title: 'Nueva Tarea',
            input: 'text', 
            inputLabel: 'Nombre de la Tarea',
            inputPlaceholder: 'Ingrese el nombre de la Tarea',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Agregar',
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3730a3',
            inputValidator: (value) => {
                if (!value) {
                return 'debe ingresar el nombre de la Tarea';
                }
            }
        });

        if ( !isConfirmed ) return;
        
            addTask(value, status);
            console.log(isConfirmed, value);
    }

    const handleDragOver = ( e: DragEvent<HTMLDivElement> ) => {
        e.preventDefault();
        setOnDragOver(true);
        // console.log('onDragOver');
    }
    const handleDragLeave = ( e: DragEvent<HTMLDivElement> ) => {
        e.preventDefault();
        setOnDragOver(false);
        // console.log('handleDragLeave');
    }
    const handleDrop = ( e: DragEvent<HTMLDivElement> ) => {
        e.preventDefault();
        setOnDragOver(false);
        // changeTaskStatus(dragingTaskId!, value);
        onTaskDrop(status);
        // console.log('handleDrop',status);
    }
  
    // exponer las funciones al mundo extior
    return {
        // properties
        isDragging,
        onDragOver,
        // methods
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop
    }
}
