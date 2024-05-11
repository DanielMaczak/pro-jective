import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const PlanDurationNormalControl = ({
  durationInput,
  label,
}: {
  durationInput: number;
  label?: boolean;
}) => {
  const [duration, setDuration] = useState<number>(durationInput);
  return (
    <div class="input-group plan-duration-normal-control">
      <NumInput
        value={duration}
        setValue={setDuration}
        className={CSS_CONTROL}
        min={1}
        {...(label ? { label: metricHeaders.plan_durationNormal } : {})}
      />
    </div>
  );
};
