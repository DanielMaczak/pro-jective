import { useSelector } from 'react-redux';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';
import { selectTask } from '../../app/reducers/tasks.reducer';

export const RealityEndDateControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="input-group reality-end-date-control">
      <DateInput
        value={task.reality.endDate}
        setValue={() => {}}
        className={CSS_CONTROL}
        enabled={false}
        {...(label ? { label: metricHeaders.reality_endDate } : {})}
      />
    </div>
  ) : null;
};
