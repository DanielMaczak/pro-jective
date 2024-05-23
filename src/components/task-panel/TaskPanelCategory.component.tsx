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
            <td class="add-task-category">
              <AddTaskControl parentCategoryId={categoryId} />
            </td>
            <td class="remove-task-category">
              <RemoveCategoryControl categoryId={categoryId} />
            </td>
            <td class="task-category-name">
              <CategoryNameControl categoryId={categoryId} />
            </td>
            <td class="task-owner"></td>
            {/* Space */}
            <td class="task-panel-space"></td>
            {/* Plan */}
            {displayPlan && (
              <>
                <td class="plan-start-date">
                  <CategoryPlanStartDateControl categoryId={categoryId} />
                </td>
                <td class="plan-duration-ideal"></td>
                <td class="plan-duration-normal"></td>
                <td class="plan-duration-bad"></td>
                <td class="plan-duration-calculated"></td>
                <td class="plan-end-date">
                  <CategoryPlanEndDateControl categoryId={categoryId} />
                </td>
                {/* Space */}
                <td class="task-panel-space"></td>
              </>
            )}
            {/* Reality */}
            {displayReality && (
              <>
                <td class="reality-start-date">
                  <CategoryRealityStartDateControl categoryId={categoryId} />
                </td>
                <td class="reality-start-delay"></td>
                <td class="reality-done"></td>
                <td class="reality-end-date">
                  <CategoryRealityEndDateControl categoryId={categoryId} />
                </td>
                <td class="reality-end-delay"></td>
                {/* Space */}
                <td class="task-panel-space"></td>
              </>
            )}
            {/* Gantt */}
            {displayGantt && (
              <>
                <td></td>
                <td></td>
                <td></td>
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
