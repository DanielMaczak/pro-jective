import { useState } from 'preact/hooks';
import { DateInput, DropdownInput, Option } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

const dependencyOptions: Option[] = [
  { id: 'dependency-option-0', value: 'Independent' },
];

export const PlanStartDateControl = ({
  startDateInput,
}: {
  startDateInput: number;
}) => {
  const [startDate, setStartDate] = useState<number>(startDateInput);
  const [selectedOption, selectOption] = useState<Option>(dependencyOptions[0]);
  return (
    <div class="input-group">
      <div class="plan-start-date-control">
        <DateInput
          value={startDate}
          setValue={setStartDate}
          className={CSS_CONTROL}
        />
      </div>
      <div class="pick-dependency-control">
        <DropdownInput
          value={selectedOption}
          setValue={o => selectOption(o)}
          options={dependencyOptions}
          className={CSS_CONTROL}
          showValue={false}
        />
      </div>
    </div>
  );
};
