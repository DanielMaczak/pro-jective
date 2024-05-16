import { useSelector } from 'react-redux';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';
import { selectTask } from '../../app/reducers/tasks.reducer';

export const RealityStartDelayControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="input-group reality-start-delay-control">
      <NumInput
        value={task.reality.startDelay}
        setValue={() => {}}
        className={CSS_CONTROL}
        enabled={false}
        {...(label ? { label: metricHeaders.reality.startDelay } : {})}
      />
    </div>
  ) : null;
};
