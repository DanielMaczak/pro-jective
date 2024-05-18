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
        <td class="task-panel-info sticky-col-0 bottom-left"></td>
        <td class="task-panel-info sticky-col-1"></td>
        <td class="task-panel-info sticky-col-2"></td>
        <td class="task-panel-info sticky-col-3 bottom-right"></td>
        {/* Space */}
        <td class="task-panel-space"></td>
        {/* Plan */}
        {displayPlan && (
          <>
            <td class="task-panel-plan bottom-left"></td>
            <td class="task-panel-plan"></td>
            <td class="task-panel-plan"></td>
            <td class="task-panel-plan"></td>
            <td class="task-panel-plan"></td>
            <td class="task-panel-plan bottom-right"></td>
            {/* Space */}
            <td class="task-panel-space"></td>
          </>
        )}
        {/* Reality */}
        {displayReality && (
          <>
            <td class="task-panel-reality bottom-left"></td>
            <td class="task-panel-reality"></td>
            <td class="task-panel-reality"></td>
            <td class="task-panel-reality"></td>
            <td class="task-panel-reality bottom-right"></td>
            {/* Space */}
            <td class="task-panel-space"></td>
          </>
        )}
        {/* Gantt */}
        {displayGantt && (
          <>
            <td class="task-panel-gantt bottom-left"></td>
            <td class="task-panel-gantt"></td>
            <td class="task-panel-gantt bottom-right"></td>
          </>
        )}
      </tr>
    </tfoot>
  );
};
