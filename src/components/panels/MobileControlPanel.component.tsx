import { useDispatch, useSelector } from 'react-redux';

import { SearchControl } from '../control-panel/SearchControl.component';
import { SortByControl } from '../control-panel/SortByControl.component';
import { WorkdaysControl } from '../control-panel/WorkdaysControl.component';
import {
  selectMobileMenuVisible,
  showTask,
} from '../../app/reducers/tasks.reducer';
import { SaveLoadControl } from '../control-panel/SaveLoadControl.component';
import { LightSwitchControl } from '../control-panel/LightSwitchControl.component';

export const MobileControlPanel = () => {
  const dispatch = useDispatch();
  const menuVisible = useSelector(selectMobileMenuVisible);
  return (
    <>
      <div
        class={`mobile-controls-cover ${
          menuVisible ? 'mobile-controls-cover-visible' : ''
        }`}
        onClick={() => dispatch(showTask({ taskId: null }))}
      >
        {' '}
      </div>
      <div
        class={`mobile-controls ${
          menuVisible ? 'mobile-controls-visible' : ''
        }`}
      >
        <SearchControl />
        <SortByControl />
        <WorkdaysControl />
        <SaveLoadControl />
        <LightSwitchControl />
      </div>
    </>
  );
};
