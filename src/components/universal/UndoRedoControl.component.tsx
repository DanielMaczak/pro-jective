import { BiUndo, BiRedo } from 'react-icons/bi';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export function UndoRedoControl() {
  return (
    <>
      <Button value="" action={() => {}} className={CSS_CONTROL}>
        <BiUndo />
      </Button>
      <Button value="" action={() => {}} className={CSS_CONTROL}>
        <BiRedo />
      </Button>
    </>
  );
}
