import { useState } from 'preact/hooks';
import { DropdownInput, Option } from 'irmas-preact-form-components';

import { workdaysOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';

export function WorkdaysControl() {
  const [selectedOption, selectOption] = useState<Option>(workdaysOptions[0]);
  return (
    <DropdownInput
      value={selectedOption}
      setValue={o => selectOption(o)}
      options={workdaysOptions}
      label="Workdays"
      className={CSS_CONTROL}
    />
  );
}
