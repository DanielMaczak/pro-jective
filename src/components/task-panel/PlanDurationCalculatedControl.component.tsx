import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const PlanDurationCalculatedControl = ({
  label,
}: {
  label?: boolean;
}) => {
  const [duration, setDuration] = useState<number>(0);
  return (
    <div class="input-group plan-duration-calculated-control">
      <NumInput
        value={duration}
        setValue={setDuration}
        className={CSS_CONTROL}
        enabled={false}
        {...(label ? { label: metricHeaders.plan_durationCalculated } : {})}
      />
    </div>
  );
};
