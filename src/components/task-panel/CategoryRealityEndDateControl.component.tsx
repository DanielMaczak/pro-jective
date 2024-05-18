import { useSelector } from 'react-redux';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { selectCategory } from '../../app/reducers/tasks.reducer';

export const CategoryRealityEndDateControl = ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const category = useSelector(selectCategory(categoryId));
  return category ? (
    <div class="input-group">
      <div class="category-reality-end-date-control">
        <DateInput
          value={category.reality.endDate}
          setValue={() => {}}
          className={CSS_CONTROL}
          enabled={false}
        />
      </div>
    </div>
  ) : null;
};
