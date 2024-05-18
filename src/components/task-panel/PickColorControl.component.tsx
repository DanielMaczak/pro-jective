import { useDispatch, useSelector } from 'react-redux';
import { DropdownInput, Option } from 'irmas-preact-form-components';

import {
  colorPickOptions,
  metricHeaders,
} from '../../services/options.service';
import { CSS_CONTROL } from '../../services/constants.service';
import {
  changeTask,
  selectTask,
  selectTaskColor,
} from '../../app/reducers/tasks.reducer';

export const PickColorControl = ({
  taskId,
  label,
}: {
  taskId: string;
  label?: boolean;
}) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTask(taskId));
  const colorSetting = useSelector(selectTaskColor(taskId));
  return task ? (
    <div class="input-group pick-color-control">
      <DropdownInput
        value={colorSetting ?? colorPickOptions[0]}
        setValue={(option: Option) =>
          dispatch(
            changeTask({
              taskId,
              propertyGroup: 'info',
              property: 'colorOptionId',
              value: option.id,
            })
          )
        }
        options={colorPickOptions}
        className={CSS_CONTROL}
        {...(label ? { label: metricHeaders.info.color } : {})}
        showValue={false}
      />
    </div>
  ) : null;
};
