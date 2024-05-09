import { useState } from 'preact/hooks';
import { SwitchInput } from 'irmas-preact-form-components';

import { displayOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';

export function DisplayControl() {
  const [selectedOptions, selectOptions] = useState<string | Set<string>>(
    displayOptions[0].id
  );
  return (
    <SwitchInput
      value={selectedOptions}
      setValue={o => selectOptions(o)}
      options={displayOptions}
      label="Display"
      className={CSS_CONTROL}
    />
  );
}
