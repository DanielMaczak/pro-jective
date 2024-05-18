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
import { CategoryPlanStartDateControl } from './CategoryPlanStartDateControl.component';
import { CategoryPlanEndDateControl } from './CategoryPlanEndDateControl.component';
import { CategoryRealityStartDateControl } from './CategoryRealityStartDateControl.component';
import { CategoryRealityEndDateControl } from './CategoryRealityEndDateControl.component';

export const TaskPanelCategory = () => {
  const displayPlan = useSelector(selectDisplayPlan);
  const displayReality = useSelector(selectDisplayReality);
  const displayGantt = useSelector(selectDisplayGantt);
  return (
    <tbody class="task-panel-body">
      {useSelector(selectCategoryIds).map((categoryId: string) => (
        <>
          <tr key={categoryId} class="task-panel-category">
            {/* Task info */}
            <td class="task-panel-info sticky-col-0">
              <AddTaskControl parentCategoryId={categoryId} />
            </td>
            <td class="task-panel-info sticky-col-1">
              <RemoveCategoryControl categoryId={categoryId} />
            </td>
            <td class="task-panel-info sticky-col-2">
              <CategoryNameControl categoryId={categoryId} />
            </td>
            <td class="task-panel-info sticky-col-3"></td>
            {/* Space */}
            <td class="task-panel-space"></td>
            {/* Plan */}
            {displayPlan && (
              <>
                <td class="task-panel-plan">
                  <CategoryPlanStartDateControl categoryId={categoryId} />
                </td>
                <td class="task-panel-plan"></td>
                <td class="task-panel-plan"></td>
                <td class="task-panel-plan"></td>
                <td class="task-panel-plan"></td>
                <td class="task-panel-plan">
                  <CategoryPlanEndDateControl categoryId={categoryId} />
                </td>
                {/* Space */}
                <td class="task-panel-space"></td>
              </>
            )}
            {/* Reality */}
            {displayReality && (
              <>
                <td class="task-panel-reality">
                  <CategoryRealityStartDateControl categoryId={categoryId} />
                </td>
                <td class="task-panel-reality"></td>
                <td class="task-panel-reality"></td>
                <td class="task-panel-reality">
                  <CategoryRealityEndDateControl categoryId={categoryId} />
                </td>
                <td class="task-panel-reality"></td>
                {/* Space */}
                <td class="task-panel-space"></td>
              </>
            )}
            {/* Gantt */}
            {displayGantt && (
              <>
                <td class="task-panel-gantt"></td>
                <td class="task-panel-gantt"></td>
                <td class="task-panel-gantt"></td>
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
