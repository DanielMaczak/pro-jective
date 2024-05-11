import { DesktopControlPanel } from './components/desktop/DesktopControlPanel.component';
import { DesktopTaskPanel } from './components/desktop/DesktopTaskPanel.component';
import { TaskPanelPopup } from './components/task-panel/TaskPanelPopup.component';

export const App = () => {
  return (
    <>
      <TaskPanelPopup />
      <DesktopControlPanel />
      <DesktopTaskPanel />
    </>
  );
};
