import { useState } from 'preact/hooks';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const RealityStartDateControl = ({
  startDateInput,
  label,
}: {
  startDateInput: number;
  label?: boolean;
}) => {
  const [startDate, setStartDate] = useState<number>(startDateInput);
  return (
    <div class="input-group reality-start-date-control">
      <DateInput
        value={startDate}
        setValue={setStartDate}
        className={CSS_CONTROL}
        {...(label ? { label: metricHeaders.reality_startDate } : {})}
      />
    </div>
  );
};
