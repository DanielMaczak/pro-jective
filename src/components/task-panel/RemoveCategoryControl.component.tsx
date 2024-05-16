import { FaRegTrashAlt } from 'react-icons/fa';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch } from 'react-redux';
import { removeCategory } from '../../app/reducers/tasks.reducer';

export const RemoveCategoryControl = ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const dispatch = useDispatch();
  return (
    <div class="control-group remove-category">
      <Button
        value=""
        action={() =>
          dispatch(removeCategory({ removeCategoryId: categoryId }))
        }
        className={CSS_CONTROL}
      >
        <FaRegTrashAlt />
      </Button>
    </div>
  );
};
