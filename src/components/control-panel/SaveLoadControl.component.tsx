import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import { useDispatch } from 'react-redux';
import { loadFromFile, saveToFile } from '../../app/reducers/tasks.reducer';
import { Dispatch } from '@reduxjs/toolkit';

const readFile = async (event: Event, dispatch: Dispatch) => {
  event.preventDefault();
  const reader = new FileReader();
  reader.onload = async e => {
    const fileContents = e.target?.result;
    fileContents && dispatch(loadFromFile({ fileContents }));
  };
  const input = event.target as HTMLInputElement;
  input.files?.length && reader.readAsText(input.files[0]);
};

export const SaveLoadControl = () => {
  const dispatch = useDispatch();
  return (
    <div class="control-group save-load-control">
      <Button
        value="Save"
        action={() => dispatch(saveToFile())}
        className={CSS_CONTROL}
      />
      <input type="file" onChange={e => readFile(e, dispatch)} />
      <Button value="Load" action={() => {}} className={CSS_CONTROL} />
    </div>
  );
};
