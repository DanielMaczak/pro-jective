import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const PlanDurationNormalControl = ({
  durationInput,
}: {
  durationInput: number;
}) => {
  const [duration, setDuration] = useState<number>(durationInput);
  return (
    <div class="control-group plan-duration-normal-control">
      <NumInput
        value={duration}
        setValue={setDuration}
        className={CSS_CONTROL}
      />
    </div>
  );
};
