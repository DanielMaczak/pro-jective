import { useSelector } from 'react-redux';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';
import { selectTask } from '../../app/reducers/tasks.reducer';

export const PlanEndDateControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="input-group plan-end-date-control">
      <DateInput
        value={task.plan.endDate}
        setValue={() => {}}
        className={CSS_CONTROL}
        enabled={false}
        {...(label ? { label: metricHeaders.plan.endDate } : {})}
      />
    </div>
  ) : null;
};
