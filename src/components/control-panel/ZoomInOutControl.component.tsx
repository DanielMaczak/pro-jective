import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const ZoomInOutControl = () => {
  return (
    <>
      <Button value="-" action={() => {}} className={CSS_CONTROL} />
      <Button value="+" action={() => {}} className={CSS_CONTROL} />
    </>
  );
};
