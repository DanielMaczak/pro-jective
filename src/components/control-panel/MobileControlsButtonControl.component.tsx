import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'irmas-preact-form-components';
import { RiMenuUnfold3Line2, RiMenuUnfold4Line2 } from 'react-icons/ri';

import { CSS_CONTROL } from '../../services/constants.service';
import {
  selectMobileMenuVisible,
  showMobileMenu,
} from '../../app/reducers/tasks.reducer';

export const MobileControlsButtonControl = () => {
  const dispatch = useDispatch();
  const menuVisible = useSelector(selectMobileMenuVisible);
  return (
    <div class="control-group mobile-controls-button">
      <Button
        value=""
        action={() => dispatch(showMobileMenu({ menuVisible: !menuVisible }))}
        className={CSS_CONTROL}
      >
        {menuVisible ? <RiMenuUnfold4Line2 /> : <RiMenuUnfold3Line2 />}
      </Button>
    </div>
  );
};
