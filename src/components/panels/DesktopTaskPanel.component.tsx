import { TaskPanelCategory } from '../task-panel/TaskPanelCategory.component';
import { TaskPanelFooter } from '../task-panel/TaskPanelFooter.component';
import { TaskPanelHeader } from '../task-panel/TaskPanelHeader.component';

export const DesktopTaskPanel = ({ tablet }: { tablet: boolean }) => {
  return (
    <div className="task-panel">
      <div className="task-panel-scroll-area">
        <table className="task-panel-table">
          <TaskPanelHeader tablet={tablet} />
          <TaskPanelCategory tablet={tablet} />
          <TaskPanelFooter tablet={tablet} />
        </table>
      </div>
    </div>
  );
};
