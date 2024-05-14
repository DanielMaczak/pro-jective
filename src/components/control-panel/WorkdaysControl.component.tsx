import { DropdownInput } from 'irmas-preact-form-components';

import { workdaysOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';

export const WorkdaysControl = () => {
  return (
    <div class="control-group workdays-control">
      <DropdownInput
        value={workdaysOptions[0]}
        setValue={() => {}}
        options={workdaysOptions}
        label="Workdays"
        className={CSS_CONTROL}
      />
    </div>
  );
};
