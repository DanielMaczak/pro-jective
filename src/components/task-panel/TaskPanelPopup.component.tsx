import { Task } from '../../lib/tasks.lib';
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

export const TaskPanelPopup = () => {
  const task: Task = fakeData.categories[0].tasks[0];
  return (
    <div className="task-panel-popup-container">
      <div className="task-panel-popup">
        {/* Task info */}
        <div className="task-panel-popup-info">
          <div className="task-panel-popup-header">Info</div>
          <TaskNameControl name={task.info.name} label />
          <TaskOwnerControl owner={task.info.owner} label />
        </div>
        {/* Plan */}
        <div className="task-panel-popup-plan">
          <div className="task-panel-popup-header">Plan</div>
          <PlanStartDateControl startDateInput={task.plan.startDate} label />
          <PlanDurationIdealControl
            durationInput={task.plan.durationIdeal}
            label
          />
          <PlanDurationNormalControl
            durationInput={task.plan.durationNormal}
            label
          />
          <PlanDurationBadControl durationInput={task.plan.durationBad} label />
          <PlanDurationCalculatedControl label />
          <PlanEndDateControl label />
        </div>
        {/* Reality */}
        <div className="task-panel-popup-reality">
          <div className="task-panel-popup-header">Reality</div>
          <RealityStartDateControl
            startDateInput={task.reality.startDate}
            label
          />
          <RealityStartDelayControl label />
          <RealityDoneControl doneInput={task.reality.done} label />
          <RealityEndDateControl label />
          <RealityEndDelayControl label />
        </div>
        {/* Task commentary */}
        <div className="task-panel-popup-commentary">
          <div className="task-panel-popup-header">Commentary</div>
          <TaskCommentaryControl commentaryInput={task.info.commentary} label />
        </div>
      </div>
      {/* Controls */}
      {/* <SavePopupControl /> */}
    </div>
  );
};
