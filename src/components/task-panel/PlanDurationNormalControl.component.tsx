import { useDispatch, useSelector } from 'react-redux';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';
import { changeTask, selectTask } from '../../app/reducers/tasks.reducer';

export const PlanDurationNormalControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="input-group plan-duration-normal-control">
      <NumInput
        value={task.plan.durationNormal}
        setValue={value =>
          dispatch(
            changeTask({
              taskId,
              propertyGroup: 'plan',
              property: 'durationNormal',
              value,
            })
          )
        }
        className={CSS_CONTROL}
        min={1}
        {...(label ? { label: metricHeaders.plan_durationNormal } : {})}
      />
    </div>
  ) : null;
};
