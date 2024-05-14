import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const TaskCommentaryControl = ({
  commentary,
  label,
}: {
  commentary: string | undefined;
  label?: boolean;
}) => {
  return (
    <div class="input-group task-commentary-control">
      <TextInput
        value={commentary ?? ''}
        setValue={() => {}}
        placeholder="Enter task commentary..."
        className={CSS_CONTROL}
        {...(label ? { label: metricHeaders.info_commentary } : {})}
        multiline
      />
    </div>
  );
};
