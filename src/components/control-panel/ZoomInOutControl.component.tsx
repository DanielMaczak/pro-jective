import { FaMinus, FaPlus } from 'react-icons/fa';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const ZoomInOutControl = () => {
  return (
    <div class="control-group zoom-in-out-control">
      <Button value="" action={() => {}} className={CSS_CONTROL}>
        <FaMinus />
      </Button>
      <Button value="" action={() => {}} className={CSS_CONTROL}>
        <FaPlus />
      </Button>
    </div>
  );
};
