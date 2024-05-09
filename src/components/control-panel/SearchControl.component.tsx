import { useState } from 'preact/hooks';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const SearchControl = () => {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <div class="control-group search-control">
      <TextInput
        value={searchText}
        setValue={setSearchText}
        placeholder="Search..."
        className={CSS_CONTROL}
      />
    </div>
  );
};
