import { ColorByControl } from '../control-panel/ColorByControl.component';
import { DisplayControl } from '../control-panel/DisplayControl.component';
import { LightSwitchControl } from '../control-panel/LightSwitchControl.component';
import { SaveLoadControl } from '../control-panel/SaveLoadControl.component';
import { SearchControl } from '../control-panel/SearchControl.component';
import { SortByControl } from '../control-panel/SortByControl.component';
import { UndoRedoControl } from '../control-panel/UndoRedoControl.component';
import { WorkdaysControl } from '../control-panel/WorkdaysControl.component';

export const DesktopControlPanel = () => {
  return (
    <div class="desktop-controls">
      <div class="desktop-controls-left">
        <SearchControl />
        <SortByControl />
        <WorkdaysControl />
        <DisplayControl />
        <ColorByControl />
      </div>
      <div class="desktop-controls-right">
        <UndoRedoControl />
        <SaveLoadControl />
        <LightSwitchControl />
      </div>
    </div>
  );
};
