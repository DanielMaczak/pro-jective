import { useSelector } from 'react-redux';

import { CategoryNameControl } from './CategoryNameControl.component';
import { NewTaskControl } from './NewTaskControl.component';
import { TaskPanelTask } from './TaskPanelTask.component';
import {
  selectCategoryIds,
  selectTaskIds,
} from '../../app/reducers/tasks.reducer';

export const TaskPanelCategory = ({ tablet }: { tablet: boolean }) => {
  return (
    <tbody className="task-panel-body">
      {useSelector(selectCategoryIds).map((categoryId: string) => (
        <>
          <tr key={categoryId} className="task-panel-category">
            {/* Task info */}
            <td className="task-panel-info sticky-col-0">
              <NewTaskControl parentCategoryId={categoryId} />
            </td>
            <td className="task-panel-info sticky-col-1">
              <CategoryNameControl categoryId={categoryId} />
            </td>
            <td className="task-panel-info sticky-col-2"></td>
            {/* Space */}
            <td className="task-panel-space"></td>
            {!tablet && (
              <>
                {/* Plan */}
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                {/* Space */}
                <td className="task-panel-space"></td>
                {/* Reality */}
                <td className="task-panel-reality"></td>
                <td className="task-panel-reality"></td>
                <td className="task-panel-reality"></td>
                <td className="task-panel-reality"></td>
                <td className="task-panel-reality"></td>
                {/* Space */}
                <td className="task-panel-space"></td>
              </>
            )}
            {/* Gantt */}
            <td className="task-panel-gantt"></td>
            <td className="task-panel-gantt"></td>
            <td className="task-panel-gantt"></td>
          </tr>
          {/* Tasks of category */}
          {useSelector(selectTaskIds(categoryId))?.map((taskId: string) => (
            <TaskPanelTask taskId={taskId} tablet={tablet} />
          ))}
        </>
      ))}
    </tbody>
  );
};
