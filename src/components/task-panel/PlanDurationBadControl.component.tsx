import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const PlanDurationBadControl = ({
  durationInput,
}: {
  durationInput: number;
}) => {
  const [duration, setDuration] = useState<number>(durationInput);
  return (
    <div class="input-group plan-duration-bad-control">
      <NumInput
        value={duration}
        setValue={setDuration}
        className={CSS_CONTROL}
        min={1}
      />
    </div>
  );
};
