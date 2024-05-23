import { FaPlus } from 'react-icons/fa';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../app/reducers/tasks.reducer';

export const AddCategoryControl = () => {
  const dispatch = useDispatch();
  return (
    <div class="control-group add-category-control">
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
