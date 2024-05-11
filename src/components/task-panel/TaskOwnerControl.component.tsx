import { useState } from 'preact/hooks';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const TaskOwnerControl = ({
  owner,
  label,
}: {
  owner: string;
  label?: boolean;
}) => {
  const [taskOwner, setTaskOwner] = useState<string>(owner);
  return (
    <div class="input-group task-owner-control">
      <TextInput
        value={taskOwner}
        setValue={setTaskOwner}
        placeholder="New task owner..."
        className={CSS_CONTROL}
        {...(label ? { label: metricHeaders.info_owner } : {})}
      />
    </div>
  );
};
