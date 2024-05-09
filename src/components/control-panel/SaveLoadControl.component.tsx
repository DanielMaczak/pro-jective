import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const SaveLoadControl = () => {
  return (
    <div class="control-group save-load-control">
      <Button value="Save" action={() => {}} className={CSS_CONTROL} />
      <Button value="Load" action={() => {}} className={CSS_CONTROL} />
    </div>
  );
};
