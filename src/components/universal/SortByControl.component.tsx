import { useState } from 'preact/hooks';
import { DropdownInput, Option } from 'irmas-preact-form-components';

import { sortByOptions } from '../../services/options.service';

export function SortByControl() {
  const [selectedOption, selectOption] = useState<Option>(sortByOptions[0]);
  return (
    <DropdownInput
      value={selectedOption}
      setValue={selectOption}
      options={sortByOptions}
      label="Sort by"
    />
  );
}
