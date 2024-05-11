import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const RealityDoneControl = ({
  doneInput,
  label,
}: {
  doneInput: number;
  label?: boolean;
}) => {
  const [done, setDone] = useState<number>(doneInput * 100);
  return (
    <div class="input-group reality-done-control">
      <NumInput
        value={done}
        setValue={setDone}
        className={CSS_CONTROL}
        min={0}
        max={100}
        {...(label ? { label: metricHeaders.reality_done } : {})}
      />
    </div>
  );
};
