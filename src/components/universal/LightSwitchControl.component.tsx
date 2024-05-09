import { useState } from 'preact/hooks';
import { MdNightlightRound, MdSunny } from 'react-icons/md';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL, CSS_NIGHTMODE } from '../../services/constants.service';

export function LightSwitchControl() {
  const [nightMode, switchNightMode] = useState<boolean>(false);
  const changeMode = () => {
    document.body.classList.toggle(CSS_NIGHTMODE);
    switchNightMode(!nightMode);
  };
  return (
    <Button value="" action={() => changeMode()} className={CSS_CONTROL}>
      {nightMode ? <MdNightlightRound /> : <MdSunny />}
    </Button>
  );
}
