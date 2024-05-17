import { useDispatch, useSelector } from 'react-redux';
import { SwitchInput } from 'irmas-preact-form-components';

import { displayOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';
import {
  changeDisplaySetting,
  selectDisplaySetting,
} from '../../app/reducers/tasks.reducer';

export const DisplayControl = () => {
  const dispatch = useDispatch();
  const displaySetting = useSelector(selectDisplaySetting);
  return (
    <div class="control-group display-control">
      <SwitchInput
        value={new Set(displaySetting)}
        setValue={settingSet =>
          dispatch(changeDisplaySetting({ setting: Array.from(settingSet) }))
        }
        options={displayOptions}
        label="Display"
        className={CSS_CONTROL}
      />
    </div>
  );
};
