import { useSelector } from 'react-redux';

import { CategoryNameControl } from './CategoryNameControl.component';
import { AddTaskControl } from './AddTaskControl.component';
import { TaskPanelTask } from './TaskPanelTask.component';
import {
  selectCategoryIds,
  selectDisplayGantt,
  selectDisplayPlan,
  selectDisplayReality,
  selectTaskIds,
} from '../../app/reducers/tasks.reducer';
import { RemoveCategoryControl } from './RemoveCategoryControl.component';

export const TaskPanelCategory = () => {
  const displayPlan = useSelector(selectDisplayPlan);
  const displayReality = useSelector(selectDisplayReality);
  const displayGantt = useSelector(selectDisplayGantt);
  return (
    <tbody className="task-panel-body">
      {useSelector(selectCategoryIds).map((categoryId: string) => (
        <>
          <tr key={categoryId} className="task-panel-category">
            {/* Task info */}
            <td className="task-panel-info sticky-col-0">
              <AddTaskControl parentCategoryId={categoryId} />
            </td>
            <td className="task-panel-info sticky-col-1">
              <RemoveCategoryControl categoryId={categoryId} />
            </td>
            <td className="task-panel-info sticky-col-2">
              <CategoryNameControl categoryId={categoryId} />
            </td>
            <td className="task-panel-info sticky-col-3"></td>
            {/* Space */}
            <td className="task-panel-space"></td>
            {/* Plan */}
            {displayPlan && (
              <>
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                <td className="task-panel-plan"></td>
                {/* Space */}
                <td className="task-panel-space"></td>
              </>
            )}
            {/* Reality */}
            {displayReality && (
              <>
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
            {displayGantt && (
              <>
                <td className="task-panel-gantt"></td>
                <td className="task-panel-gantt"></td>
                <td className="task-panel-gantt"></td>
              </>
            )}
          </tr>
          {/* Tasks of category */}
          {useSelector(selectTaskIds(categoryId))?.map((taskId: string) => (
            <TaskPanelTask taskId={taskId} />
          ))}
        </>
      ))}
    </tbody>
  );
};
