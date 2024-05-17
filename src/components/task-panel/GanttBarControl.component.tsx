import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';

import { CSS_BAR_WIDTH, DAY_SEC } from '../../services/constants.service';
import {
  selectMinDate,
  selectTask,
  selectWorkdays,
  selectZoomCoef,
  showTask,
} from '../../app/reducers/tasks.reducer';

/**
 * @author https://github.com/kokizzu
 * @link https://stackoverflow.com/a/28425663
 */
const getWorkdaysBetween = (
  workdays: number,
  startDate: Moment,
  endDate: Moment
): number => {
  let endOfFirstWk = startDate.clone().endOf('week');
  let startOfLastWk = endDate.clone().startOf('week');
  let wholeWks = (startOfLastWk.diff(endOfFirstWk, 'days') * workdays) / 7;
  let firstWk = endOfFirstWk.day() - startDate.day();
  if (workdays < 7 && startDate.day() == 0) --firstWk;
  let lastWk = endDate.day() - startOfLastWk.day();
  if (workdays < 6 && endDate.day() == 6) --lastWk;
  return firstWk + Math.floor(wholeWks) + lastWk;
};

const convertToRem = (days: number, zoomCoef: number): number => {
  return +(days * zoomCoef * CSS_BAR_WIDTH).toFixed(2);
};

export const GanttBarControl = ({ taskId }: { taskId: string }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  const minDate = useSelector(selectMinDate);
  const zoomCoef = useSelector(selectZoomCoef);
  const workdays = useSelector(selectWorkdays);
  let planOffset = 0;
  let planWidth = 0;
  let realityOffset = 0;
  let realityWidth = 0;
  if (task && minDate) {
    if (task.plan.startDate && task.plan.endDate) {
      planOffset = getWorkdaysBetween(
        workdays,
        moment(minDate),
        moment(task.plan.startDate)
      );
      planWidth = getWorkdaysBetween(
        workdays,
        moment(task.plan.startDate),
        moment(task.plan.endDate + DAY_SEC)
      );
    }
    if (task.reality.startDate && task.reality.endDate) {
      realityOffset = getWorkdaysBetween(
        workdays,
        moment(minDate),
        moment(task.reality.startDate)
      );
      realityWidth = getWorkdaysBetween(
        workdays,
        moment(task.reality.startDate),
        moment(task.reality.endDate + DAY_SEC)
      );
    }
  }
  const totalWidth = [
    ...Array(
      Math.max(1, planOffset + planWidth, realityOffset + realityWidth)
    ).keys(),
  ];
  return task ? (
    <div
      class="input-group gantt-bar-control"
      style={`width: ${convertToRem(totalWidth.length, zoomCoef)}rem;`}
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
            <td style={`width: ${convertToRem(1, zoomCoef)}rem;`}></td>
          ))}
        </tr>
      </table>
    </div>
  ) : null;
};
