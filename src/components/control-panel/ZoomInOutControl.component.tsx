import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'irmas-preact-form-components';

import { CSS_CONTROL } from '../../services/constants.service';
import {
  selectCanZoomIn,
  selectCanZoomOut,
  selectDisplayGantt,
  zoomIn,
  zoomOut,
} from '../../app/reducers/tasks.reducer';

export const ZoomInOutControl = () => {
  const dispatch = useDispatch();
  const ganttVisible = useSelector(selectDisplayGantt);
  const canZoomIn = useSelector(selectCanZoomIn);
  const canZoomOut = useSelector(selectCanZoomOut);
  return ganttVisible ? (
    <div class="control-group zoom-in-out-control">
      <Button
        value=""
        action={() => dispatch(zoomOut())}
        className={CSS_CONTROL}
        enabled={canZoomOut}
      >
        <FaMinus />
      </Button>
      <Button
        value=""
        action={() => dispatch(zoomIn())}
        className={CSS_CONTROL}
        enabled={canZoomIn}
      >
        <FaPlus />
      </Button>
    </div>
  ) : null;
};
