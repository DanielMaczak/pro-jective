import { useDispatch, useSelector } from 'react-redux';
import { DropdownInput, Option } from 'irmas-preact-form-components';

import { colorPickOptions } from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';
import { changeTask, selectTask } from '../../app/reducers/tasks.reducer';

export const PickColorControl = ({ taskId }: { taskId: string }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  return task ? (
    <div class="control-group pick-color-control">
      <DropdownInput
        value={
          colorPickOptions.find(
            (option: Option) => option.id === task.info.colorOptionId
          ) ?? colorPickOptions[0]
        }
        setValue={value =>
          dispatch(
            changeTask({
              taskId,
              propertyGroup: 'info',
              property: 'colorOptionId',
              value,
            })
          )
        }
        options={colorPickOptions}
        className={CSS_CONTROL}
        showValue={false}
      />
    </div>
  ) : null;
};
