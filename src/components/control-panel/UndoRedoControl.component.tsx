import { BiUndo, BiRedo } from 'react-icons/bi';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectCanRedo, selectCanUndo } from '../../app/reducers/tasks.reducer';
import { ActionCreators } from 'redux-undo';

export const UndoRedoControl = () => {
  const dispatch = useDispatch();
  const canRedo = useSelector(selectCanRedo);
  const canUndo = useSelector(selectCanUndo);
  return (
    <div class="control-group undo-redo-control">
      <Button
        value=""
        action={() => dispatch(ActionCreators.undo())}
        className={CSS_CONTROL}
        enabled={canUndo}
      >
        <BiUndo />
      </Button>
      <Button
        value=""
        action={() => dispatch(ActionCreators.redo())}
        className={CSS_CONTROL}
        enabled={canRedo}
      >
        <BiRedo />
      </Button>
    </div>
  );
};
