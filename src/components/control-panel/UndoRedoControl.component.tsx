import { BiUndo, BiRedo } from 'react-icons/bi';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const UndoRedoControl = () => {
  return (
    <div class="control-group undo-redo-control">
      <Button value="" action={() => {}} className={CSS_CONTROL}>
        <BiUndo />
      </Button>
      <Button value="" action={() => {}} className={CSS_CONTROL}>
        <BiRedo />
      </Button>
    </div>
  );
};
