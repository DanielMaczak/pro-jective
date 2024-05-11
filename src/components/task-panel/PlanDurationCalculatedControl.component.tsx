import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const PlanDurationCalculatedControl = () => {
  const [duration, setDuration] = useState<number>(0);
  return (
    <div class="input-group plan-duration-calculated-control">
      <NumInput
        value={duration}
        setValue={setDuration}
        className={CSS_CONTROL}
        enabled={false}
      />
    </div>
  );
};
