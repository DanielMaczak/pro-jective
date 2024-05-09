import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';
import { NewCategoryControl } from './NewCategoryControl.component';

export const TaskPanelHeader = () => {
  return (
    <thead className="task-panel-header">
      <tr className="task-panel-row">
        {/* Task info */}
        <td className="task-panel-info top-left">
          <NewCategoryControl />
        </td>
        <td className="task-panel-info">Name</td>
        <td className="task-panel-info top-right">Owner</td>
        {/* Space */}
        <td className="task-panel-space"></td>
        {/* Plan */}
        <td className="task-panel-plan top-left">Start date</td>
        <td className="task-panel-plan">
          <FaStar />
        </td>
        <td className="task-panel-plan">
          <FaStarHalfAlt />
        </td>
        <td className="task-panel-plan">
          <FaRegStar />
        </td>
        <td className="task-panel-plan">Calc.</td>
        <td className="task-panel-plan top-right">End date</td>
        {/* Space */}
        <td className="task-panel-space"></td>
        {/* Reality */}
        <td className="task-panel-reality top-left">Start date</td>
        <td className="task-panel-reality"></td>
        <td className="task-panel-reality">Done</td>
        <td className="task-panel-reality">End date</td>
        <td className="task-panel-reality top-right"></td>
        {/* Space */}
        <td className="task-panel-space"></td>
        {/* Gantt */}
        <td className="task-panel-gantt top-left">1</td>
        <td className="task-panel-gantt">2</td>
        <td className="task-panel-gantt">3</td>
        <td className="task-panel-gantt">4</td>
        <td className="task-panel-gantt">5</td>
        <td className="task-panel-gantt">6</td>
        <td className="task-panel-gantt top-right">7</td>
      </tr>
    </thead>
  );
};
