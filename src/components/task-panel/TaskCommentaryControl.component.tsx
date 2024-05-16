import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';
import { changeTask, selectTask } from '../../app/reducers/tasks.reducer';

export const TaskCommentaryControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="input-group task-commentary-control">
      <TextInput
        value={task.info.commentary}
        setValue={value =>
          dispatch(
            changeTask({
              taskId,
              propertyGroup: 'info',
              property: 'commentary',
              value,
            })
          )
        }
        placeholder="Enter task commentary..."
        className={CSS_CONTROL}
        {...(label ? { label: metricHeaders.info.commentary } : {})}
        multiline
      />
    </div>
  ) : null;
};
