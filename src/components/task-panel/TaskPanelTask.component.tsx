import { useSelector } from 'react-redux';

import { GanttBarControl } from './GanttBarControl.component';
import { PickColorControl } from './PickColorControl.component';
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
import { RemoveTaskControl } from './RemoveTaskControl.component';
import { TaskNameControl } from './TaskNameControl.component';
import { TaskOwnerControl } from './TaskOwnerControl.component';
import {
  selectDisplayGantt,
  selectDisplayPlan,
  selectDisplayReality,
  selectTask,
  selectTaskColor,
} from '../../app/reducers/tasks.reducer';
import { CSS_MAX_ZINDEX } from '../../services/constants.service';

export const TaskPanelTask = ({ taskId }: { taskId: string }) => {
  const task = useSelector(selectTask(taskId));
  const colorSetting = useSelector(selectTaskColor(taskId));
  const displayPlan = useSelector(selectDisplayPlan);
  const displayReality = useSelector(selectDisplayReality);
  const displayGantt = useSelector(selectDisplayGantt);
  return (
    <tr
      key={taskId}
      class="task-panel-task"
      style={
        `z-index: ${CSS_MAX_ZINDEX - (task?.orderNumber ?? 1)};` +
        `--control-highlight: ${colorSetting?.color ?? 'transparent'};`
      }
    >
      {/* Task info */}
      <td class="add-task-category hover-effect">
        <PickColorControl taskId={taskId} />
      </td>
      <td class="remove-task-category hover-effect">
        <RemoveTaskControl taskId={taskId} />
      </td>
      <td class="task-category-name hover-effect">
        <TaskNameControl taskId={taskId} />
      </td>
      <td class="task-owner hover-effect">
        <TaskOwnerControl taskId={taskId} />
      </td>
      {/* Space */}
      <td class="task-panel-space"></td>
      {/* Plan */}
      {displayPlan && (
        <>
          <td class="plan-start-date hover-effect">
            <PlanStartDateControl taskId={taskId} />
          </td>
          <td class="plan-duration-ideal hover-effect">
            <PlanDurationIdealControl taskId={taskId} />
          </td>
          <td class="plan-duration-normal hover-effect">
            <PlanDurationNormalControl taskId={taskId} />
          </td>
          <td class="plan-duration-bad hover-effect">
            <PlanDurationBadControl taskId={taskId} />
          </td>
          <td class="plan-duration-calculated">
            <PlanDurationCalculatedControl taskId={taskId} />
          </td>
          <td class="plan-end-date">
            <PlanEndDateControl taskId={taskId} />
          </td>
          {/* Space */}
          <td class="task-panel-space"></td>
        </>
      )}
      {/* Reality */}
      {displayReality && (
        <>
          <td class="reality-start-date hover-effect">
            <RealityStartDateControl taskId={taskId} />
          </td>
          <td class="reality-start-delay">
            <RealityStartDelayControl taskId={taskId} />
          </td>
          <td class="reality-done hover-effect">
            <RealityDoneControl taskId={taskId} />
          </td>
          <td class="reality-end-date">
            <RealityEndDateControl taskId={taskId} />
          </td>
          <td class="reality-end-delay">
            <RealityEndDelayControl taskId={taskId} />
          </td>
          {/* Space */}
          <td class="task-panel-space"></td>
        </>
      )}
      {/* Gantt */}
      {displayGantt && (
        <>
          <td></td>
          <td>
            <GanttBarControl taskId={taskId} />
          </td>
          <td></td>
        </>
      )}
    </tr>
  );
};
