import { FaPlus } from 'react-icons/fa';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../app/reducers/tasks.reducer';

export const NewCategoryControl = () => {
  const dispatch = useDispatch();
  return (
    <div class="control-group new-category">
      <Button
        value=""
        action={() => dispatch(addCategory())}
        className={CSS_CONTROL}
      >
        <FaPlus />
      </Button>
    </div>
  );
};
