import { TaskPanelCategory } from '../task-panel/TaskPanelCategory.component';
import { TaskPanelFooter } from '../task-panel/TaskPanelFooter.component';
import { TaskPanelHeader } from '../task-panel/TaskPanelHeader.component';

export const DesktopTaskPanel = () => {
  return (
    <div className="task-panel">
      <div className="task-panel-scroll-area">
        <table className="task-panel-table">
          <TaskPanelHeader />
          <TaskPanelCategory />
          <TaskPanelFooter />
        </table>
      </div>
    </div>
  );
};
