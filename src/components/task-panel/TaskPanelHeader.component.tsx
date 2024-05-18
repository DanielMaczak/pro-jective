import { useSelector } from 'react-redux';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';

import { AddCategoryControl } from './AddCategoryControl.component';
import { metricHeaders } from '../../services/options.service';
import {
  selectDisplayGantt,
  selectDisplayPlan,
  selectDisplayReality,
} from '../../app/reducers/tasks.reducer';
import { GanttTimelineControl } from './GanttBarControl.component';

export const TaskPanelHeader = () => {
  const displayPlan = useSelector(selectDisplayPlan);
  const displayReality = useSelector(selectDisplayReality);
  const displayGantt = useSelector(selectDisplayGantt);
  return (
    <thead class="task-panel-header">
      <tr class="task-panel-header-row">
        {/* Task info */}
        <th class="task-panel-info sticky-col-0 top-left">
          <AddCategoryControl />
        </th>
        <th class="task-panel-info sticky-col-1"></th>
        <th class="task-panel-info task-name-control sticky-col-2 header-to-left">
          <h3>Info</h3>
          {metricHeaders.info.name}
        </th>
        <th class="task-panel-info task-owner-control sticky-col-3 top-right header-to-left">
          {metricHeaders.info.owner}
        </th>
        {/* Space */}
        <th class="task-panel-space"></th>
        {/* Plan */}
        {displayPlan && (
          <>
            <th class="task-panel-plan plan-start-control top-left header-to-left">
              <h3>Plan</h3>
              {metricHeaders.plan.startDate}
            </th>
            <th class="task-panel-plan plan-duration-ideal-control">
              <FaStar />
            </th>
            <th class="task-panel-plan plan-duration-normal-control">
              <h4>Duration</h4>
              <FaStarHalfAlt />
            </th>
            <th class="task-panel-plan plan-duration-bad-control">
              <FaRegStar />
            </th>
            <th class="task-panel-plan plan-duration-calculated-control">
              Calc
            </th>
            <th class="task-panel-plan plan-end-date-control top-right">
              {metricHeaders.plan.endDate}
            </th>
            {/* Space */}
            <th class="task-panel-space"></th>
          </>
        )}
        {/* Reality */}
        {displayReality && (
          <>
            <th class="task-panel-reality reality-start-control top-left header-to-left">
              <h3>Reality</h3>
              {metricHeaders.reality.startDate}
            </th>
            <th class="task-panel-reality reality-start-delay-control">
              {metricHeaders.reality.startDelay}
            </th>
            <th class="task-panel-reality reality-done-control">
              {metricHeaders.reality.done}
            </th>
            <th class="task-panel-reality reality-end-date-control">
              {metricHeaders.reality.endDate}
            </th>
            <th class="task-panel-reality reality-end-delay-control top-right">
              {metricHeaders.reality.endDelay}
            </th>
            {/* Space */}
            <th class="task-panel-space"></th>
          </>
        )}
        {/* Gantt */}
        {displayGantt && (
          <>
            <th class="task-panel-gantt top-left header-to-left">
              <h3>Gantt chart</h3>
            </th>
            <th class="task-panel-gantt header-to-right">
              <GanttTimelineControl />
            </th>
            <th class="task-panel-gantt top-right"></th>
          </>
        )}
      </tr>
    </thead>
  );
};
