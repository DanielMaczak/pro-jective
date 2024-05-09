import { FaPlus } from 'react-icons/fa';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const NewCategoryControl = () => {
  return (
    <div class="control-group new-category">
      <Button value="" action={() => {}} className={CSS_CONTROL}>
        <FaPlus />
      </Button>
    </div>
  );
};
