import { useDispatch, useSelector } from 'react-redux';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';
import { changeTask, selectTask } from '../../app/reducers/tasks.reducer';

export const RealityDoneControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="input-group reality-done-control">
      <NumInput
        value={task.reality.done}
        setValue={value =>
          dispatch(
            changeTask({
              taskId,
              propertyGroup: 'reality',
              property: 'done',
              value,
            })
          )
        }
        className={CSS_CONTROL}
        min={0}
        max={100}
        {...(label ? { label: metricHeaders.reality.done } : {})}
      />
    </div>
  ) : null;
};
