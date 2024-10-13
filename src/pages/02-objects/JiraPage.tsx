import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {

  // const tasks = useTaskStore( state => state.tasks );
  const pendingTasks = useTaskStore( state => state.getTaskByStatus('open') );
  const inProgressTasks = useTaskStore( state => state.getTaskByStatus('in-progress') );
  const doneTasks = useTaskStore( state => state.getTaskByStatus('done') );
  // console.log({ tasks, pendingTasks, inProgressTasks, doneTasks });

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          
          <JiraTasks title='Pendientes' status='open' task={ pendingTasks } />
          
          <JiraTasks title='Avanzando' status='in-progress' task={ inProgressTasks}/>
          
          <JiraTasks title='Terminadas' status='done' task={ doneTasks} />

      </div>

    </>
  );
};