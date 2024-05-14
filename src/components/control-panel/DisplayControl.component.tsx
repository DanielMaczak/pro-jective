import { SwitchInput } from 'irmas-preact-form-components';

import { displayOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';

export const DisplayControl = () => {
  return (
    <div class="control-group display-control">
      <SwitchInput
        value={
          new Set([
            displayOptions[0].id,
            displayOptions[1].id,
            displayOptions[2].id,
          ])
        }
        setValue={() => {}}
        options={displayOptions}
        label="Display"
        className={CSS_CONTROL}
      />
    </div>
  );
};
