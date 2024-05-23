import { useSelector } from 'react-redux';

import {
  selectDisplayGantt,
  selectDisplayPlan,
  selectDisplayReality,
} from '../../app/reducers/tasks.reducer';

export const TaskPanelFooter = () => {
  const displayPlan = useSelector(selectDisplayPlan);
  const displayReality = useSelector(selectDisplayReality);
  const displayGantt = useSelector(selectDisplayGantt);
  return (
    <tfoot class="task-panel-footer">
      <tr class="task-panel-footer-row">
        {/* Task info */}
        <td class="add-task-category bottom-left"></td>
        <td class="remove-task-category"></td>
        <td class="task-category-name"></td>
        <td class="task-owner bottom-right"></td>
        {/* Space */}
        <td class="task-panel-space"></td>
        {/* Plan */}
        {displayPlan && (
          <>
            <td class="plan-start-date bottom-left"></td>
            <td class="plan-duration-ideal"></td>
            <td class="plan-duration-normal"></td>
            <td class="plan-duration-bad"></td>
            <td class="plan-duration-calculated"></td>
            <td class="plan-end-date bottom-right"></td>
            {/* Space */}
            <td class="task-panel-space"></td>
          </>
        )}
        {/* Reality */}
        {displayReality && (
          <>
            <td class="reality-start-date bottom-left"></td>
            <td class="reality-start-delay"></td>
            <td class="reality-done"></td>
            <td class="reality-end-date"></td>
            <td class="reality-end-delay bottom-right"></td>
            {/* Space */}
            <td class="task-panel-space"></td>
          </>
        )}
        {/* Gantt */}
        {displayGantt && (
          <>
            <td class="bottom-left"></td>
            <td></td>
            <td class="bottom-right"></td>
          </>
        )}
      </tr>
    </tfoot>
  );
};
