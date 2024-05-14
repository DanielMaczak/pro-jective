import { DropdownInput } from 'irmas-preact-form-components';

import { colorByOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';

export const ColorByControl = () => {
  return (
    <div class="control-group color-by-control">
      <DropdownInput
        value={colorByOptions[0]}
        setValue={() => {}}
        options={colorByOptions}
        label="Color by"
        className={CSS_CONTROL}
      />
    </div>
  );
};
