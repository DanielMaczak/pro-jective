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
        <th class="add-task-category top-left">
          <AddCategoryControl />
        </th>
        <th class="remove-task-category"></th>
        <th class="task-category-name header-to-left">
          <h3>Info</h3>
          {metricHeaders.info.name}
        </th>
        <th class="task-owner top-right header-to-left">
          {metricHeaders.info.owner}
        </th>
        {/* Space */}
        <th class="task-panel-space"></th>
        {/* Plan */}
        {displayPlan && (
          <>
            <th class="plan-start-date top-left header-to-left">
              <h3>Plan</h3>
              {metricHeaders.plan.startDate}
            </th>
            <th class="plan-duration-ideal">
              <FaStar />
            </th>
            <th class="plan-duration-normal">
              <h4>Duration</h4>
              <FaStarHalfAlt />
            </th>
            <th class="plan-duration-bad">
              <FaRegStar />
            </th>
            <th class="plan-duration-calculated">Calc</th>
            <th class="plan-end-date top-right">
              {metricHeaders.plan.endDate}
            </th>
            {/* Space */}
            <th class="task-panel-space"></th>
          </>
        )}
        {/* Reality */}
        {displayReality && (
          <>
            <th class="reality-start-date top-left header-to-left">
              <h3>Reality</h3>
              {metricHeaders.reality.startDate}
            </th>
            <th class="reality-start-delay">
              Start
              <br />
              delay
            </th>
            <th class="reality-done">{metricHeaders.reality.done}</th>
            <th class="reality-end-date">{metricHeaders.reality.endDate}</th>
            <th class="reality-end-delay top-right">
              End
              <br />
              delay
            </th>
            {/* Space */}
            <th class="task-panel-space"></th>
          </>
        )}
        {/* Gantt */}
        {displayGantt && (
          <>
            <th class="top-left header-to-left"></th>
            <th>
              <GanttTimelineControl />
            </th>
            <th class="top-right"></th>
          </>
        )}
      </tr>
    </thead>
  );
};
