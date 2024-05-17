import { Provider } from 'react-redux';

import { store } from './app/store';
import { DesktopControlPanel } from './components/panels/DesktopControlPanel.component';
import { DesktopTaskPanel } from './components/panels/DesktopTaskPanel.component';
// import { MobileTaskPanel } from './components/panels/MobileTaskPanel.component';
import { TaskPanelPopup } from './components/task-panel/TaskPanelPopup.component';

export const App = () => {
  const mobile = false;
  const tablet = false;

  // useEffect(() => {
  //   window.addEventListener('resize', handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener('resize', handleWindowSizeChange);
  //   };
  // }, []);

  // const handleWindowSizeChange = () => {
  //   setTablet(window.innerWidth <= 960);
  //   setMobile(window.innerWidth <= 640);
  // };

  return (
    <Provider store={store}>
      <TaskPanelPopup />
      {mobile ? (
        <>{/* <MobileTaskPanel /> */}</>
      ) : (
        <>
          <DesktopControlPanel />
          <DesktopTaskPanel tablet={tablet} />
        </>
      )}
    </Provider>
  );
};
