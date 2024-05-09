import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const RealityStartDelayControl = () => {
  const [delay, setDelay] = useState<number>(0);
  return (
    <div class="control-group reality-start-delay-control">
      <NumInput
        value={delay}
        setValue={setDelay}
        className={CSS_CONTROL}
        enabled={false}
      />
    </div>
  );
};
