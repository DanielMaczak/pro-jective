import { useState } from 'preact/hooks';
import { DropdownInput, Option } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

const dependencyOptions: Option[] = [
  { id: 'dependency-option-0', value: 'Independent' },
];

export const PickDependencyControl = () => {
  const [selectedOption, selectOption] = useState<Option>(dependencyOptions[0]);
  return (
    <div class="control-group pick-dependency-control">
      <DropdownInput
        value={selectedOption}
        setValue={o => selectOption(o)}
        options={dependencyOptions}
        className={CSS_CONTROL}
      />
    </div>
  );
};
