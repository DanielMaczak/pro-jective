import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const SavePopupControl = () => {
  return (
    <div className="control-group save-popup-control">
      <Button value="Save" action={() => {}} className={CSS_CONTROL} />
    </div>
  );
};
