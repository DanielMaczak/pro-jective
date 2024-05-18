import { DisplayControl } from '../control-panel/DisplayControl.component';
import { LightSwitchControl } from '../control-panel/LightSwitchControl.component';
import { SaveLoadControl } from '../control-panel/SaveLoadControl.component';
import { SearchControl } from '../control-panel/SearchControl.component';
import { SortByControl } from '../control-panel/SortByControl.component';
import { UndoRedoControl } from '../control-panel/UndoRedoControl.component';
import { WorkdaysControl } from '../control-panel/WorkdaysControl.component';
import { ZoomInOutControl } from '../control-panel/ZoomInOutControl.component';

export const DesktopControlPanel = () => {
  return (
    <div class="desktop-controls">
      <div class="desktop-controls-left">
        <SearchControl />
        <SortByControl />
        <WorkdaysControl />
        <DisplayControl />
      </div>
      <div class="desktop-controls-right">
        <ZoomInOutControl />
        <UndoRedoControl />
        <SaveLoadControl />
        <LightSwitchControl />
      </div>
    </div>
  );
};
