import { useDispatch, useSelector } from 'react-redux';
import { DateInput, DropdownInput, Option } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import {
  independentOptionId,
  metricHeaders,
} from '../../services/options.service';
import {
  changeDependency,
  changeTask,
  selectDepedentOptions,
  selectTask,
} from '../../app/reducers/tasks.reducer';

export const PlanStartDateControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  const dependenceOptions = useSelector(selectDepedentOptions(taskId));
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
          enabled={!Boolean(task.dependentOnId)}
        />
      </div>
      <div class="pick-dependency-control">
        <DropdownInput
          value={
            (task.dependentOnId &&
              dependenceOptions.find(
                (option: Option) => option.id === task.dependentOnId
              )) ||
            dependenceOptions[0]
          }
          setValue={option =>
            option.id === independentOptionId
              ? dispatch(
                  changeDependency({
                    dependentTaskId: task.id,
                    anchorTaskId: null,
                  })
                )
              : dispatch(
                  changeDependency({
                    dependentTaskId: task.id,
                    anchorTaskId: option.id,
                  })
                )
          }
          options={dependenceOptions}
          className={CSS_CONTROL}
          showValue={false}
        />
      </div>
    </div>
  ) : null;
};
