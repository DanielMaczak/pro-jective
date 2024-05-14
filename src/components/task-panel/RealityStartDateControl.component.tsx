import { useDispatch, useSelector } from 'react-redux';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';
import { changeTask, selectTask } from '../../app/reducers/tasks.reducer';

export const RealityStartDateControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="input-group reality-start-date-control">
      <DateInput
        value={task.reality.startDate}
        setValue={value =>
          dispatch(
            changeTask({
              taskId,
              propertyGroup: 'reality',
              property: 'startDate',
              value,
            })
          )
        }
        className={CSS_CONTROL}
        {...(label ? { label: metricHeaders.reality_startDate } : {})}
      />
    </div>
  ) : null;
};
