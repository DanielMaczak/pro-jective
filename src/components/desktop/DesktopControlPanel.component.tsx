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
        <div class="control-group search-control">
          <SearchControl />
        </div>
        <div class="control-group sort-by-control">
          <SortByControl />
        </div>
        <div class="control-group workdays-control">
          <WorkdaysControl />
        </div>
        <div class="control-group display-control">
          <DisplayControl />
        </div>
        <div class="control-group color-by-control">
          <ColorByControl />
        </div>
      </div>
      <div class="desktop-controls-right">
        <div class="control-group undo-redo-control">
          <UndoRedoControl />
        </div>
        <div class="control-group save-load-control">
          <SaveLoadControl />
        </div>
        <div class="control-group light-switch-control">
          <LightSwitchControl />
        </div>
      </div>
    </div>
  );
};
