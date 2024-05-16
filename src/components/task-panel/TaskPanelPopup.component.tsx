import { useDispatch, useSelector } from 'react-redux';

import { PlanDurationBadControl } from './PlanDurationBadControl.component';
import { PlanDurationCalculatedControl } from './PlanDurationCalculatedControl.component';
import { PlanDurationIdealControl } from './PlanDurationIdealControl.component';
import { PlanDurationNormalControl } from './PlanDurationNormalControl.component';
import { PlanEndDateControl } from './PlanEndDateControl.component';
import { PlanStartDateControl } from './PlanStartDateControl.component';
import { RealityDoneControl } from './RealityDoneControl.component';
import { RealityEndDateControl } from './RealityEndDateControl.component';
import { RealityEndDelayControl } from './RealityEndDelayControl.component';
import { RealityStartDateControl } from './RealityStartDateControl.component';
import { RealityStartDelayControl } from './RealityStartDelayControl.component';
import { TaskNameControl } from './TaskNameControl.component';
import { TaskOwnerControl } from './TaskOwnerControl.component';
import { TaskCommentaryControl } from './TaskCommentaryControl.component';
import {
  selectTaskIdForPopup,
  showTask,
} from '../../app/reducers/tasks.reducer';

export const TaskPanelPopup = () => {
  const dispatch = useDispatch();
  const taskId = useSelector(selectTaskIdForPopup);
  return taskId ? (
    <>
      <div
        className="task-panel-popup-cover"
        onClick={() => dispatch(showTask({ taskId: null }))}
      ></div>
      <div className="task-panel-popup-container">
        <div className="task-panel-popup">
          {/* Task info */}
          <div className="task-panel-popup-info">
            <div className="task-panel-popup-header">Info</div>
            <TaskNameControl taskId={taskId} label />
            <TaskOwnerControl taskId={taskId} label />
          </div>
          {/* Plan */}
          <div className="task-panel-popup-plan">
            <div className="task-panel-popup-header">Plan</div>
            <PlanStartDateControl taskId={taskId} label />
            <PlanDurationIdealControl taskId={taskId} label />
            <PlanDurationNormalControl taskId={taskId} label />
            <PlanDurationBadControl taskId={taskId} label />
            <PlanDurationCalculatedControl taskId={taskId} label />
            <PlanEndDateControl taskId={taskId} label />
          </div>
          {/* Reality */}
          <div className="task-panel-popup-reality">
            <div className="task-panel-popup-header">Reality</div>
            <RealityStartDateControl taskId={taskId} label />
            <RealityStartDelayControl taskId={taskId} label />
            <RealityDoneControl taskId={taskId} label />
            <RealityEndDateControl taskId={taskId} label />
            <RealityEndDelayControl taskId={taskId} label />
          </div>
          {/* Task commentary */}
          <div className="task-panel-popup-commentary">
            <div className="task-panel-popup-header">Commentary</div>
            <TaskCommentaryControl taskId={taskId} label />
          </div>
        </div>
        {/* Controls */}
        {/* <SavePopupControl /> */}
      </div>
    </>
  ) : null;
};
