import { useState } from 'preact/hooks';
import { Button, TextInput } from 'irmas-preact-form-components';

export function SaveLoadControl() {
  const [fileName, setFileName] = useState<string>('');
  return (
    <>
      <TextInput value={fileName} setValue={n => setFileName(n)} />
      <Button value="Save" action={() => {}} />
      <Button value="Load" action={() => {}} />
    </>
  );
}
