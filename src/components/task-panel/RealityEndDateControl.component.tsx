import { useState } from 'preact/hooks';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const RealityEndDateControl = () => {
  const [endDate, setEndDate] = useState<number>(0);
  return (
    <div class="control-group reality-end-date-control">
      <DateInput
        value={endDate}
        setValue={setEndDate}
        className={CSS_CONTROL}
        enabled={false}
      />
    </div>
  );
};
