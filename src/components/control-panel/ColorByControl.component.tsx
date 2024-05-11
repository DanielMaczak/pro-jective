import { useState } from 'preact/hooks';
import { DropdownInput, Option } from 'irmas-preact-form-components';

import { colorByOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';

export const ColorByControl = () => {
  const [selectedOption, selectOption] = useState<Option>(colorByOptions[0]);
  return (
    <div class="control-group color-by-control">
      <DropdownInput
        value={selectedOption}
        setValue={o => selectOption(o)}
        options={colorByOptions}
        label="Color by"
        className={CSS_CONTROL}
      />
    </div>
  );
};