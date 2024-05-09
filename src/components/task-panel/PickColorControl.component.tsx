import { useState } from 'preact/hooks';
import { DropdownInput, Option } from 'irmas-preact-form-components';

import { colorPickOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';

export const PickColorControl = ({ color }: { color: string }) => {
  const colorOption: Option =
    colorPickOptions.find((option: Option) => option.id === color) ??
    colorPickOptions[0];
  const [selectedOption, selectOption] = useState<Option>(colorOption);
  return (
    <div class="control-group pick-color-control">
      <DropdownInput
        value={selectedOption}
        setValue={o => selectOption(o)}
        options={colorPickOptions}
        className={CSS_CONTROL}
      />
    </div>
  );
};
