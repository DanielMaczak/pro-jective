import { ColorByControl } from '../universal/ColorByControl.component';
import { DisplayControl } from '../universal/DisplayControl.component';
import { LightSwitchControl } from '../universal/LightSwitchControl.component';
import { SaveLoadControl } from '../universal/SaveLoadControl.component';
import { SearchControl } from '../universal/SearchControl.component';
import { SortByControl } from '../universal/SortByControl.component';
import { UndoRedoControl } from '../universal/UndoRedoControl.component';
import { WorkdaysControl } from '../universal/WorkdaysControl.component';

export function DesktopControls() {
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
}
