import { useState } from 'preact/hooks';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { metricHeaders } from '../../services/options.service';

export const RealityEndDateControl = ({ label }: { label?: boolean }) => {
  const [endDate, setEndDate] = useState<number>(0);
  return (
    <div class="input-group reality-end-date-control">
      <DateInput
        value={endDate}
        setValue={setEndDate}
        className={CSS_CONTROL}
        enabled={false}
        {...(label ? { label: metricHeaders.reality_endDate } : {})}
      />
    </div>
  );
};
