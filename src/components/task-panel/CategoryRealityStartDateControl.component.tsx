import { useSelector } from 'react-redux';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { selectCategory } from '../../app/reducers/tasks.reducer';

export const CategoryRealityStartDateControl = ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const category = useSelector(selectCategory(categoryId));
  return category ? (
    <div class="input-group">
      <div class="category-reality-start-date-control">
        <DateInput
          value={category.reality.startDate}
          setValue={() => {}}
          className={CSS_CONTROL}
          enabled={false}
        />
      </div>
    </div>
  ) : null;
};
