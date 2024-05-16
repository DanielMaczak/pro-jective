import { useSelector } from 'react-redux';

import { CSS_BAR_WIDTH, DAY_SEC } from '../../services/constants.service';
import { selectMinDate, selectTask } from '../../app/reducers/tasks.reducer';

export const GanttBarControl = ({ taskId }: { taskId: string }) => {
  const task = useSelector(selectTask(taskId));
  const minDate = useSelector(selectMinDate);
  let planOffset = 0;
  let planWidth = 0;
  let realityOffset = 0;
  let realityWidth = 0;
  if (task && minDate) {
    if (task.plan.startDate && task.plan.endDate) {
      planOffset = Math.floor((task.plan.startDate - minDate) / DAY_SEC);
      planWidth = Math.floor(
        (task.plan.endDate - task.plan.startDate) / DAY_SEC
      );
    }
    if (task.reality.startDate && task.reality.endDate) {
      realityOffset = Math.floor((task.reality.startDate - minDate) / DAY_SEC);
      realityWidth = Math.floor(
        (task.reality.endDate - task.reality.startDate) / DAY_SEC
      );
    }
  }
  let totalWidth = [...Array(realityOffset + realityWidth).keys()];
  return task && minDate ? (
    <div class="input-group gantt-bar-control">
      {/* Lighter bar showing plan */}
      <div
        class="gantt-bar-plan-control"
        style={
          `left: ${planOffset * CSS_BAR_WIDTH}rem;` +
          `width: ${planWidth * CSS_BAR_WIDTH}rem;`
        }
      ></div>
      {/* Darker bar showing real progress */}
      <div
        class="gantt-bar-reality-control"
        style={
          `left: ${realityOffset * CSS_BAR_WIDTH}rem;` +
          `width: ${realityWidth * CSS_BAR_WIDTH}rem;`
        }
      ></div>
      {/* Grid behind */}
      <table className="gantt-bar-back-control">
        <tr>
          {totalWidth.map(_ => (
            <td></td>
          ))}
        </tr>
      </table>
    </div>
  ) : null;
};
