import { useState } from 'preact/hooks';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const TaskCommentaryControl = ({
  commentaryInput,
  label,
}: {
  commentaryInput: string | undefined;
  label?: boolean;
}) => {
  const [commentary, setCommentary] = useState<string>(commentaryInput ?? '');
  return (
    <div class="input-group task-commentary-control">
      <TextInput
        value={commentary}
        setValue={setCommentary}
        placeholder="Enter task commentary..."
        className={CSS_CONTROL}
        {...(label ? { label: metricHeaders.info_commentary } : {})}
        multiline
      />
    </div>
  );
};
