import { DropdownInput } from 'irmas-preact-form-components';

import { sortByOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';

export const SortByControl = () => {
  return (
    <div class="control-group sort-by-control">
      <DropdownInput
        value={sortByOptions[0]}
        setValue={() => {}}
        options={sortByOptions}
        label="Sort by"
        className={CSS_CONTROL}
      />
    </div>
  );
};
