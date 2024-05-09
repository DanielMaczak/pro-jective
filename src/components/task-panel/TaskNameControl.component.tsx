import { useState } from 'preact/hooks';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const TaskNameControl = ({ name }: { name: string }) => {
  const [taskName, setTaskName] = useState<string>(name);
  return (
    <div class="control-group task-name-control">
      <TextInput
        value={taskName}
        setValue={setTaskName}
        placeholder="New task name..."
        className={CSS_CONTROL}
      />
    </div>
  );
};
