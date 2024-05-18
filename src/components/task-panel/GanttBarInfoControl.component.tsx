import { useSelector } from 'react-redux';

import { selectTask } from '../../app/reducers/tasks.reducer';

export const GanttBarInfoControl = ({ taskId }: { taskId: string }) => {
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div className="gantt-bar-info-control">
      {task.info.name + ' / ' + task.info.owner}
    </div>
  ) : null;
};
