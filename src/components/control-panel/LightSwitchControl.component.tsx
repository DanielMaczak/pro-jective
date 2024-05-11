import { useState } from 'preact/hooks';
import { MdNightlightRound, MdSunny } from 'react-icons/md';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL, CSS_NIGHTMODE } from '../../services/constants.service';

export const LightSwitchControl = () => {
  const [nightMode, switchNightMode] = useState<boolean>(false);
  const changeMode = () => {
    document.body.classList.toggle(CSS_NIGHTMODE);
    switchNightMode(!nightMode);
  };
  return (
    <div class="control-group light-switch-control">
      <Button value="" action={() => changeMode()} className={CSS_CONTROL}>
        {nightMode ? <MdNightlightRound /> : <MdSunny />}
      </Button>
    </div>
  );
};