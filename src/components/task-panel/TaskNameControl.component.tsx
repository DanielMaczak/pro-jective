import { useState } from 'preact/hooks';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const TaskNameControl = ({
  name,
  label,
}: {
  name: string;
  label?: boolean;
}) => {
  const [taskName, setTaskName] = useState<string>(name);
  return (
    <div class="input-group task-name-control">
      <TextInput
        value={taskName}
        setValue={setTaskName}
        placeholder="New task name..."
        className={CSS_CONTROL}
        {...(label ? { label: metricHeaders.info_name } : {})}
      />
    </div>
  );
};
