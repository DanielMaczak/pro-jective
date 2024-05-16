import { useDispatch } from 'react-redux';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { search } from '../../app/reducers/tasks.reducer';

export const SearchControl = () => {
  const dispatch = useDispatch();
  return (
    <div class="control-group search-control">
      <TextInput
        value={''}
        setValue={value => dispatch(search({ searchedValue: value }))}
        placeholder="Search..."
        className={CSS_CONTROL}
      />
    </div>
  );
};
