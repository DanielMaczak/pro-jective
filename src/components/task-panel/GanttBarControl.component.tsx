import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';

import { CSS_BAR_WIDTH } from '../../services/constants.service';
import {
  selectMaxDate,
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
  endDate: Moment,
  isLength: boolean = false
): number => {
  startDate = startDate
    .utcOffset(0)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  endDate = endDate
    .utcOffset(0)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  let diff = moment.duration(endDate.diff(startDate));
  if (endDate.weekday() >= startDate.weekday() && diff.asDays() <= 7) {
    return diff.asDays() + (isLength ? 1 : 0);
  } else if (
    endDate.diff(startDate.clone().endOf('isoWeek').add(7, 'days')) <= 0
  ) {
    return diff.asDays() - 7 + workdays + (isLength ? 1 : 0);
  } else {
    console.log(
      diff.asDays(),
      diff.asDays() / 7,
      Math.floor(diff.asDays() / 7)
    );

    return (
      diff.asDays() -
      Math.floor((diff.asDays() + 1) / 7) * (7 - workdays) +
      (isLength ? 1 : 0)
    );
  }
};

const convertToRem = (days: number, zoomCoef: number): number => {
  return +(days * zoomCoef * CSS_BAR_WIDTH).toFixed(2);
};

const getTotalWidth = (
  minDate: number,
  maxDate: number,
  workdays: number
): number[] => {
  return [
    ...Array(
      Math.max(
        1,
        getWorkdaysBetween(workdays, moment(minDate), moment(maxDate), true)
      )
    ).keys(),
  ];
};

const getDates = (minDate: number, totalWidth: number[], workdays: number) => {
  let prevDate: Moment = moment(minDate).add(-1, 'day');
  return totalWidth.map(_ => {
    prevDate = prevDate.add(1, 'day');
    let workday: number = prevDate.day() || 7;
    if (workday > workdays) prevDate = prevDate.endOf('isoWeek').add(1, 'day');
    return prevDate.clone();
  });
};

export const GanttTimelineControl = () => {
  const minDate = useSelector(selectMinDate);
  const maxDate = useSelector(selectMaxDate);
  const zoomCoef = useSelector(selectZoomCoef);
  const workdays = useSelector(selectWorkdays);
  const totalWidth = getTotalWidth(minDate, maxDate, workdays);
  const dates = getDates(minDate, totalWidth, workdays);
  return minDate < maxDate ? (
    <div
      class="gantt-timeline-control"
      style={`width: ${convertToRem(totalWidth.length, zoomCoef)}rem;`}
    >
      <table class="gantt-timeline-table">
        <tr>
          {totalWidth.map((_, i) => (
            <td
              class={`gantt-timeline-day`}
              style={`width: ${convertToRem(1, zoomCoef)}rem;`}
            >
              {i === 0 || dates[i].month() !== dates[i - 1].month() ? (
                <span class="gantt-timeline-month">
                  {dates[i].format('MMM')}
                </span>
              ) : null}
              <span class="gantt-timeline-date">{dates[i].date()}</span>
            </td>
          ))}
        </tr>
      </table>
    </div>
  ) : null;
};

export const GanttBarControl = ({ taskId }: { taskId: string }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  const minDate = useSelector(selectMinDate);
  const maxDate = useSelector(selectMaxDate);
  const zoomCoef = useSelector(selectZoomCoef);
  const workdays = useSelector(selectWorkdays);
  const totalWidth = getTotalWidth(minDate, maxDate, workdays);
  const dates = getDates(minDate, totalWidth, workdays);
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
        moment(task.plan.endDate),
        true
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
        moment(task.reality.endDate),
        true
      );
    }
  }
  return task ? (
    <div
      class="input-group gantt-bar-control hover-effect"
      style={`width: ${convertToRem(totalWidth.length, zoomCoef)}rem;`}
      onClick={() => dispatch(showTask({ taskId }))}
    >
      {/* Lighter bar showing plan */}
      {planWidth ? (
        <div
          class="gantt-bar-plan-control"
          style={
            `left: ${convertToRem(planOffset, zoomCoef)}rem;` +
            `width: ${convertToRem(planWidth, zoomCoef)}rem;`
          }
        ></div>
      ) : null}
      {/* Darker bar showing real progress */}
      {realityWidth ? (
        <div
          class="gantt-bar-reality-control"
          style={
            `left: ${convertToRem(realityOffset, zoomCoef)}rem;` +
            `width: ${convertToRem(realityWidth, zoomCoef)}rem;`
          }
        ></div>
      ) : null}
      {/* Grid behind */}
      <table class="gantt-bar-back-control">
        <tr>
          {totalWidth.map((_, i) => (
            <td
              class={dates[i].week() % 2 === 0 ? 'even-week' : ''}
              style={`width: ${convertToRem(1, zoomCoef)}rem;`}
            ></td>
          ))}
        </tr>
      </table>
    </div>
  ) : null;
};
