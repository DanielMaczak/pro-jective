import { useState } from 'preact/hooks';
import { TextInput } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';

export const CategoryNameControl = ({ name }: { name: string }) => {
  const [categoryName, setCategoryName] = useState<string>(name);
  return (
    <div class="control-group category-name-control">
      <TextInput
        value={categoryName}
        setValue={setCategoryName}
        placeholder="New category name..."
        className={CSS_CONTROL}
      />
    </div>
  );
};
