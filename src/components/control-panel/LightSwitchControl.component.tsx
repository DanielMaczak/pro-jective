import { MdNightlightRound, MdSunny } from 'react-icons/md';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL, CSS_NIGHTMODE } from '../../services/constants.service';

export const LightSwitchControl = () => {
  return (
    <div class="control-group light-switch-control">
      <Button value="" action={() => {}} className={CSS_CONTROL}>
        <MdSunny />
      </Button>
    </div>
  );
};
