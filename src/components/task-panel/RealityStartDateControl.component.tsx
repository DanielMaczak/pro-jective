import { useState } from 'preact/hooks';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const RealityStartDateControl = ({
  startDateInput,
}: {
  startDateInput: number;
}) => {
  const [startDate, setStartDate] = useState<number>(startDateInput);
  return (
    <div class="control-group reality-start-date-control">
      <DateInput
        value={startDate}
        setValue={setStartDate}
        className={CSS_CONTROL}
      />
    </div>
  );
};
