import { useState } from 'preact/hooks';
import { NumInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const RealityDoneControl = ({ doneInput }: { doneInput: number }) => {
  const [done, setDone] = useState<number>(doneInput * 100);
  return (
    <div class="control-group reality-done-control">
      <NumInput value={done} setValue={setDone} className={CSS_CONTROL} />%
    </div>
  );
};
