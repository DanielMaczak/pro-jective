import { useState } from 'preact/hooks';
import { DropdownInput, Option } from 'irmas-preact-form-components';

import { sortByOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';

export const SortByControl = () => {
  const [selectedOption, selectOption] = useState<Option>(sortByOptions[0]);
  return (
    <div class="control-group sort-by-control">
      <DropdownInput
        value={selectedOption}
        setValue={selectOption}
        options={sortByOptions}
        label="Sort by"
        className={CSS_CONTROL}
      />
    </div>
  );
};
