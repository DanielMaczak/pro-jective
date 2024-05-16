import { FaPlus } from 'react-icons/fa';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch } from 'react-redux';
import { addTask } from '../../app/reducers/tasks.reducer';

export const AddTaskControl = ({
  parentCategoryId,
}: {
  parentCategoryId: string;
}) => {
  const dispatch = useDispatch();
  return (
    <div class="control-group add-task">
      <Button
        value=""
        action={() => dispatch(addTask({ parentCategoryId }))}
        className={CSS_CONTROL}
      >
        <FaPlus />
      </Button>
    </div>
  );
};
