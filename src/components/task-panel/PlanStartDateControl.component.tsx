import { DateInput, DropdownInput, Option } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';
import { useDispatch, useSelector } from 'react-redux';
import { changeTask, selectTask } from '../../app/reducers/tasks.reducer';

const dependencyOptions: Option[] = [
  { id: 'dependency-option-0', value: 'Independent' },
];

export const PlanStartDateControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="input-group">
      <div class="plan-start-date-control">
        <DateInput
          value={task.plan.startDate}
          setValue={value =>
            dispatch(
              changeTask({
                taskId,
                propertyGroup: 'plan',
                property: 'startDate',
                value,
              })
            )
          }
          className={CSS_CONTROL}
          {...(label ? { label: metricHeaders.plan.startDate } : {})}
        />
      </div>
      <div class="pick-dependency-control">
        <DropdownInput
          value={task.plan.dependency ?? dependencyOptions[0]}
          setValue={value =>
            dispatch(
              changeTask({
                taskId,
                propertyGroup: 'plan',
                property: 'dependency',
                value,
              })
            )
          }
          options={dependencyOptions}
          className={CSS_CONTROL}
          showValue={false}
        />
      </div>
    </div>
  ) : null;
};
