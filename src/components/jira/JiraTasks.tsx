import { DragEvent, useState } from 'react';
import { IoCheckmarkCircleOutline, IoEllipsisHorizontalOutline } from 'react-icons/io5';
import { Task, TaskStatus } from '../../interfaces';
import { SingleTask } from './SingleTask';
import { useTaskStore } from '../../stores';
import classNames from 'classnames';

interface Props {
  title: string;
  task: Task[];
  value: TaskStatus;
  // value: 'pending' | 'in-progress' | 'done';
}


export const JiraTasks = ({ title, value, task }: Props) => {

  const isDragging = useTaskStore( state => !!state.draggingTaskId ); // para tomarlo como un booleano
  // const changeTaskStatus = useTaskStore( state => state.changeTaskStatus );
  // const dragingTaskId = useTaskStore( state => state.draggingTaskId );
  const onTaskDrop = useTaskStore( state => state.onTaskDrop );

  const [onDragOver, setOnDragOver] = useState(false);
  // console.log(isDragging);

  const handleDragOver = ( e: DragEvent<HTMLDivElement> ) => {
      e.preventDefault();
      setOnDragOver(true);
      console.log('onDragOver');
  }
  const handleDragLeave = ( e: DragEvent<HTMLDivElement> ) => {
      e.preventDefault();
      setOnDragOver(false);
      console.log('handleDragLeave');
  }
  const handleDrop = ( e: DragEvent<HTMLDivElement> ) => {
      e.preventDefault();
      setOnDragOver(false);
      // changeTaskStatus(dragingTaskId!, value);
      onTaskDrop(value);
      console.log('handleDrop',value);
  }

  return (
    <div
      onDragOver={ handleDragOver }
      onDragLeave={ handleDragLeave }
      onDrop={ handleDrop }
      className={ 
        classNames("!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",{
          'border-blue-500 border-dotted': isDragging,
          'border-green-500 border-dotted': isDragging && onDragOver
        })
      }
    >


      {/* Task Header */ }
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex items-center justify-center bg-indigo-100 rounded-full h-9 w-9">
            <span className="flex items-center justify-center w-6 h-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </div>

        <button>
          <IoEllipsisHorizontalOutline />
        </button>

      </div>

      {/* Task Items */ }
      <div className="w-full h-full">

        {
          task.map( task  => (
            <SingleTask key={ task.id } task={ task } />
          ))
        }

      </div>
    </div>
  );
};