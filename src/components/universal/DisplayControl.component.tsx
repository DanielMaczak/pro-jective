import { useState } from 'preact/hooks';
import { SwitchInput } from 'irmas-preact-form-components';

import { workdaysOptions } from '../../services/options.service';

export function DisplayControl() {
  const [selectedOptions, selectOptions] = useState<string | Set<string>>(
    workdaysOptions[0].id
  );
  return (
    <SwitchInput
      value={selectedOptions}
      setValue={o => selectOptions(o)}
      options={workdaysOptions}
      label="Display"
    />
  );
}
