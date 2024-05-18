import { useSelector } from 'react-redux';
import { DateInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { selectCategory } from '../../app/reducers/tasks.reducer';

export const CategoryPlanStartDateControl = ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const category = useSelector(selectCategory(categoryId));
  return category ? (
    <div class="input-group">
      <div class="category-plan-start-date-control">
        <DateInput
          value={category.plan.startDate}
          setValue={() => {}}
          className={CSS_CONTROL}
          enabled={false}
        />
      </div>
    </div>
  ) : null;
};
