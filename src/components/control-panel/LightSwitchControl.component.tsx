import { MdNightlightRound, MdSunny } from 'react-icons/md';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectNightSwitchOn,
  switchLight,
} from '../../app/reducers/tasks.reducer';

export const LightSwitchControl = () => {
  const dispatch = useDispatch();
  const nightSwitchOn = useSelector(selectNightSwitchOn);
  return (
    <div class="control-group light-switch-control">
      <Button
        value=""
        action={() => dispatch(switchLight())}
        className={CSS_CONTROL}
      >
        {nightSwitchOn ? <MdNightlightRound /> : <MdSunny />}
      </Button>
    </div>
  );
};
