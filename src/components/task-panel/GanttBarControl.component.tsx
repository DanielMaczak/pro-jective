import { useDispatch, useSelector } from 'react-redux';

import { CSS_BAR_WIDTH, DAY_SEC } from '../../services/constants.service';
import {
  selectMinDate,
  selectTask,
  selectZoomCoef,
  showTask,
} from '../../app/reducers/tasks.reducer';

const convertToDays = (sizeMs: number) => {
  return +(sizeMs / DAY_SEC).toFixed(2);
};
const convertToRem = (sizeMs: number, zoomCoef: number): number => {
  return +(convertToDays(sizeMs) * zoomCoef * CSS_BAR_WIDTH).toFixed(2);
};

export const GanttBarControl = ({ taskId }: { taskId: string }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  const minDate = useSelector(selectMinDate);
  const zoomCoef = useSelector(selectZoomCoef);
  let planOffset = 0;
  let planWidth = 0;
  let realityOffset = 0;
  let realityWidth = 0;
  if (task && minDate) {
    if (task.plan.startDate && task.plan.endDate) {
      planOffset = task.plan.startDate - minDate;
      planWidth = task.plan.endDate - task.plan.startDate + DAY_SEC;
    }
    if (task.reality.startDate && task.reality.endDate) {
      realityOffset = task.reality.startDate - minDate;
      realityWidth = task.reality.endDate - task.reality.startDate + DAY_SEC;
    }
  }
  const totalWidth = [
    ...Array(
      Math.max(
        1,
        convertToDays(planOffset + planWidth),
        convertToDays(realityOffset + realityWidth)
      )
    ).keys(),
  ];
  return task ? (
    <div
      class="input-group gantt-bar-control"
      onClick={() => dispatch(showTask({ taskId }))}
    >
      {/* Lighter bar showing plan */}
      <div
        class="gantt-bar-plan-control"
        style={
          `left: ${convertToRem(planOffset, zoomCoef)}rem;` +
          `width: ${convertToRem(planWidth, zoomCoef)}rem;`
        }
      ></div>
      {/* Darker bar showing real progress */}
      <div
        class="gantt-bar-reality-control"
        style={
          `left: ${convertToRem(realityOffset, zoomCoef)}rem;` +
          `width: ${convertToRem(realityWidth, zoomCoef)}rem;`
        }
      ></div>
      {/* Grid behind */}
      <table className="gantt-bar-back-control">
        <tr>
          {totalWidth.map(_ => (
            <td style={`width: ${convertToRem(DAY_SEC, zoomCoef)}rem;`}></td>
          ))}
        </tr>
      </table>
    </div>
  ) : null;
};
