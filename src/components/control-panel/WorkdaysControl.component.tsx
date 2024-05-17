import { DropdownInput, Option } from 'irmas-preact-form-components';

import { workdaysOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeWorkdaysSetting,
  selectWorkdaysSetting,
} from '../../app/reducers/tasks.reducer';

export const WorkdaysControl = () => {
  const dispatch = useDispatch();
  const workdaysSetting = useSelector(selectWorkdaysSetting);
  return (
    <div class="control-group workdays-control">
      <DropdownInput
        value={workdaysSetting ?? workdaysOptions[0]}
        setValue={(settingOption: Option) =>
          dispatch(changeWorkdaysSetting({ setting: settingOption.id }))
        }
        options={workdaysOptions}
        label="Workdays"
        className={CSS_CONTROL}
      />
    </div>
  );
};
