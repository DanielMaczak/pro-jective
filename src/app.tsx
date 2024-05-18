import { ComponentChildren } from 'preact';
import { useDispatch, useSelector } from 'react-redux';

import { DesktopControlPanel } from './components/panels/DesktopControlPanel.component';
import { DesktopTaskPanel } from './components/panels/DesktopTaskPanel.component';
import { MobileTaskPanel } from './components/panels/MobileTaskPanel.component';
import { TaskPanelPopup } from './components/task-panel/TaskPanelPopup.component';
import {
  changeDeviceSetting,
  selectDeviceSetting,
} from './app/reducers/tasks.reducer';
import { MobileControlPanel } from './components/panels/MobileControlPanel.component';

const DetectDevice = ({ children }: { children: ComponentChildren }) => {
  const dispatch = useDispatch();
  dispatch(changeDeviceSetting({ isMobile: window.innerWidth <= 640 }));
  return <>{children}</>;
};

export const App = () => {
  const isMobile = useSelector(selectDeviceSetting);
  return (
    <DetectDevice>
      <TaskPanelPopup />
      {isMobile ? (
        <>
          <MobileControlPanel />
          <MobileTaskPanel />
        </>
      ) : (
        <>
          <DesktopControlPanel />
          <DesktopTaskPanel />
        </>
      )}
    </DetectDevice>
  );
};
