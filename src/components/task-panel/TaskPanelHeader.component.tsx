import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { NewCategoryControl } from './NewCategoryControl.component';
import { metricHeaders } from '../../services/options.service';

export const TaskPanelHeader = () => {
  return (
    <thead className="task-panel-header">
      <tr className="task-panel-header-row">
        {/* Task info */}
        <th className="task-panel-info sticky-col-0 top-left">
          <NewCategoryControl />
        </th>
        <th className="task-panel-info sticky-col-1 header-to-left">
          <h3>Info</h3>
          {metricHeaders.info_name}
        </th>
        <th className="task-panel-info sticky-col-2 top-right header-to-left">
          {metricHeaders.info_owner}
        </th>
        {/* Space */}
        <th className="task-panel-space"></th>
        {/* Plan */}
        <th className="task-panel-plan top-left header-to-left">
          <h3>Plan</h3>
          {metricHeaders.plan_startDate}
        </th>
        <th className="task-panel-plan">
          <FaStar />
        </th>
        <th className="task-panel-plan">
          <h4>Duration</h4>
          <FaStarHalfAlt />
        </th>
        <th className="task-panel-plan">
          <FaRegStar />
        </th>
        <th className="task-panel-plan">Calc.</th>
        <th className="task-panel-plan top-right">
          {metricHeaders.plan_endDate}
        </th>
        {/* Space */}
        <th className="task-panel-space"></th>
        {/* Reality */}
        <th className="task-panel-reality top-left header-to-left">
          <h3>Reality</h3>
          {metricHeaders.reality_startDate}
        </th>
        <th className="task-panel-reality">
          {metricHeaders.reality_startDelay}
        </th>
        <th className="task-panel-reality">{metricHeaders.reality_done}</th>
        <th className="task-panel-reality">{metricHeaders.reality_endDate}</th>
        <th className="task-panel-reality top-right">
          {metricHeaders.reality_endDelay}
        </th>
        {/* Space */}
        <th className="task-panel-space"></th>
        {/* Gantt */}
        <th className="task-panel-gantt top-left header-to-left">
          <h3>Gantt chart</h3>
        </th>
        <th className="task-panel-gantt"></th>
        <th className="task-panel-gantt top-right"></th>
      </tr>
    </thead>
  );
};
