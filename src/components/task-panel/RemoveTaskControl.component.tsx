import { FaRegTrashAlt } from 'react-icons/fa';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch } from 'react-redux';
import { removeTask } from '../../app/reducers/tasks.reducer';

export const RemoveTaskControl = ({ taskId }: { taskId: string }) => {
  const dispatch = useDispatch();
  return (
    <div class="control-group remove-task">
      <Button
        value=""
        action={() => dispatch(removeTask({ removeTaskId: taskId }))}
        className={CSS_CONTROL}
      >
        <FaRegTrashAlt />
      </Button>
    </div>
  );
};
