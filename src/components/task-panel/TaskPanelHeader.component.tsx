import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { NewCategoryControl } from './NewCategoryControl.component';

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
          Name
        </th>
        <th className="task-panel-info sticky-col-2 top-right header-to-left">
          Owner
        </th>
        {/* Space */}
        <th className="task-panel-space"></th>
        {/* Plan */}
        <th className="task-panel-plan top-left header-to-left">
          <h3>Plan</h3>
          Start date
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
        <th className="task-panel-plan top-right">End date</th>
        {/* Space */}
        <th className="task-panel-space"></th>
        {/* Reality */}
        <th className="task-panel-reality top-left header-to-left">
          <h3>Reality</h3>
          Start date
        </th>
        <th className="task-panel-reality">Delay</th>
        <th className="task-panel-reality">Done</th>
        <th className="task-panel-reality">End date</th>
        <th className="task-panel-reality top-right">Delay</th>
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
