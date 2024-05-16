import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';

import { AddCategoryControl } from './AddCategoryControl.component';
import { metricHeaders } from '../../services/options.service';
import { ZoomInOutControl } from '../control-panel/ZoomInOutControl.component';

export const TaskPanelHeader = ({ tablet }: { tablet: boolean }) => {
  return (
    <thead className="task-panel-header">
      <tr className="task-panel-header-row">
        {/* Task info */}
        <th className="task-panel-info sticky-col-0 top-left">
          <AddCategoryControl />
        </th>
        <th className="task-panel-info sticky-col-1"></th>
        <th className="task-panel-info task-name-control sticky-col-2 header-to-left">
          <h3>Info</h3>
          {metricHeaders.info.name}
        </th>
        <th className="task-panel-info task-owner-control sticky-col-3 top-right header-to-left">
          {metricHeaders.info.owner}
        </th>
        {/* Space */}
        <th className="task-panel-space"></th>
        {!tablet && (
          <>
            {/* Plan */}
            <th className="task-panel-plan plan-start-control top-left header-to-left">
              <h3>Plan</h3>
              {metricHeaders.plan.startDate}
            </th>
            <th className="task-panel-plan plan-duration-ideal-control">
              <FaStar />
            </th>
            <th className="task-panel-plan plan-duration-normal-control">
              <h4>Duration</h4>
              <FaStarHalfAlt />
            </th>
            <th className="task-panel-plan plan-duration-bad-control">
              <FaRegStar />
            </th>
            <th className="task-panel-plan plan-duration-calculated-control">
              Calc
            </th>
            <th className="task-panel-plan plan-end-date-control top-right">
              {metricHeaders.plan.endDate}
            </th>
            {/* Space */}
            <th className="task-panel-space"></th>
            {/* Reality */}
            <th className="task-panel-reality reality-start-control top-left header-to-left">
              <h3>Reality</h3>
              {metricHeaders.reality.startDate}
            </th>
            <th className="task-panel-reality reality-start-delay-control">
              {metricHeaders.reality.startDelay}
            </th>
            <th className="task-panel-reality reality-done-control">
              {metricHeaders.reality.done}
            </th>
            <th className="task-panel-reality reality-end-date-control">
              {metricHeaders.reality.endDate}
            </th>
            <th className="task-panel-reality reality-end-delay-control top-right">
              {metricHeaders.reality.endDelay}
            </th>
            {/* Space */}
            <th className="task-panel-space"></th>
          </>
        )}
        {/* Gantt */}
        <th className="task-panel-gantt top-left header-to-left">
          <h3>Gantt chart</h3>
        </th>
        <th className="task-panel-gantt header-to-right">
          <ZoomInOutControl />
        </th>
        <th className="task-panel-gantt top-right"></th>
      </tr>
    </thead>
  );
};
