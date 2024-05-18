import { DropdownInput, Option } from 'irmas-preact-form-components';

import { sortByOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSortBySetting,
  selectSortBySetting,
} from '../../app/reducers/tasks.reducer';

export const SortByControl = () => {
  const dispatch = useDispatch();
  const sortBySetting = useSelector(selectSortBySetting);
  return (
    <div class="control-group sort-by-control">
      <DropdownInput
        value={sortBySetting ?? sortByOptions[0]}
        setValue={(settingOption: Option) =>
          dispatch(changeSortBySetting({ setting: settingOption.id }))
        }
        options={sortByOptions}
        label="Sort by"
        className={CSS_CONTROL}
      />
    </div>
  );
};
