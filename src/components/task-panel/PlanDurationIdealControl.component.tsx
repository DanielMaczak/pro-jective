import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const PlanDurationIdealControl = ({
  durationInput,
}: {
  durationInput: number;
}) => {
  const [duration, setDuration] = useState<number>(durationInput);
  return (
    <div class="control-group plan-duration-ideal-control">
      <NumInput
        value={duration}
        setValue={setDuration}
        className={CSS_CONTROL}
      />
    </div>
  );
};
