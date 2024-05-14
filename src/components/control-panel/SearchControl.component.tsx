import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const SearchControl = () => {
  return (
    <div class="control-group search-control">
      <TextInput
        value={''}
        setValue={() => {}}
        placeholder="Search..."
        className={CSS_CONTROL}
      />
    </div>
  );
};
