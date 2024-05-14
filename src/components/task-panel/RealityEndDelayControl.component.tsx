import { useSelector } from 'react-redux';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';
import { selectTask } from '../../app/reducers/tasks.reducer';

export const RealityEndDelayControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="input-group reality-end-delay-control">
      <NumInput
        value={task.reality.endDelay}
        setValue={() => {}}
        className={CSS_CONTROL}
        enabled={false}
        {...(label ? { label: metricHeaders.reality_endDelay } : {})}
      />
    </div>
  ) : null;
};
