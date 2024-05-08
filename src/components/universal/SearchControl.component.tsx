import { useState } from 'preact/hooks';
import { TextInput } from 'irmas-preact-form-components';

export function SearchControl() {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <TextInput
      value={searchText}
      setValue={setSearchText}
      placeholder="Search..."
    />
  );
}
