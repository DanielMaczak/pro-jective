import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import {
  changeCategory,
  selectCategory,
} from '../../app/reducers/tasks.reducer';

export const CategoryNameControl = ({ categoryId }: { categoryId: string }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory(categoryId));
  return category ? (
    <div class="control-group category-name-control">
      <TextInput
        value={category.name}
        setValue={value =>
          dispatch(changeCategory({ categoryId, property: 'name', value }))
        }
        placeholder="New category name..."
        className={CSS_CONTROL}
      />
    </div>
  ) : null;
};
