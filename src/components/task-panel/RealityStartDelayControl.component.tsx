import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const RealityStartDelayControl = ({ label }: { label?: boolean }) => {
  const [delay, setDelay] = useState<number>(0);
  return (
    <div class="input-group reality-start-delay-control">
      <NumInput
        value={delay}
        setValue={setDelay}
        className={CSS_CONTROL}
        enabled={false}
        {...(label ? { label: metricHeaders.reality_startDelay } : {})}
      />
    </div>
  );
};
