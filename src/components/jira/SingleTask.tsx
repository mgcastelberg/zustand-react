import { IoReorderTwoOutline } from "react-icons/io5";
import { Task } from "../../interfaces";
import { useTaskStore } from "../../stores";

interface Props {
    task: Task;
}

export const SingleTask = ({ task }: Props) => {

  const setDraggedTaskId = useTaskStore( state => state.setDraggedTaskId );
  const removeDraggedTaskId = useTaskStore( state => state.removeDraggedTaskId );

  return (
        <div 
            draggable
            onDragStart={ () => setDraggedTaskId(task.id) }
            onDragEnd={ () => removeDraggedTaskId() }
            className="flex items-center justify-between p-2 mt-5 bg-white border-2 border-gray-100 rounded-lg"
        >
            <div className="flex items-center justify-center gap-2">
                <p className="text-base font-bold text-navy-700">
                    { task.title }
                </p>
            </div>
            {/* Importamos Icono */}
            <span className="flex items-center justify-center w-6 h-6 text-center cursor-pointer text-navy-700">
                <IoReorderTwoOutline />
            </span>
        </div>
  );
};
