import { useEffect, useState } from 'preact/hooks';
import { DesktopControlPanel } from './components/panels/DesktopControlPanel.component';
import { DesktopTaskPanel } from './components/panels/DesktopTaskPanel.component';
import { MobileTaskPanel } from './components/panels/MobileTaskPanel.component';
// import { TaskPanelPopup } from './components/task-panel/TaskPanelPopup.component';

export const App = () => {
  const [tablet, setTablet] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const handleWindowSizeChange = () => {
    setTablet(window.innerWidth <= 960);
    setMobile(window.innerWidth <= 640);
  };

  return (
    <>
      {/* <TaskPanelPopup /> */}
      {mobile ? (
        <>
          <MobileTaskPanel />
        </>
      ) : (
        <>
          <DesktopControlPanel />
          <DesktopTaskPanel tablet={tablet} />
        </>
      )}
    </>
  );
};
