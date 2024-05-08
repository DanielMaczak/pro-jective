import { useState } from 'preact/hooks';
import { DropdownInput, Option } from 'irmas-preact-form-components';

import { colorByOptions } from '../../services/options.service';

export function ColorByControl() {
  const [selectedOption, selectOption] = useState<Option>(colorByOptions[0]);
  return (
    <DropdownInput
      value={selectedOption}
      setValue={o => selectOption(o)}
      options={colorByOptions}
      label="Color by"
    />
  );
}
