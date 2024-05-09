import { useState } from 'preact/hooks';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const TaskOwnerControl = ({ owner }: { owner: string }) => {
  const [taskOwner, setTaskOwner] = useState<string>(owner);
  return (
    <div class="control-group task-owner-control">
      <TextInput
        value={taskOwner}
        setValue={setTaskOwner}
        placeholder="New task owner..."
        className={CSS_CONTROL}
      />
    </div>
  );
};
