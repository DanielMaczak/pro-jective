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
} from '../../app/reducers/tasks.reducer';
import { CSS_MAX_ZINDEX } from '../../services/constants.service';

export const TaskPanelTask = ({ taskId }: { taskId: string }) => {
  const task = useSelector(selectTask(taskId));
  const displayPlan = useSelector(selectDisplayPlan);
  const displayReality = useSelector(selectDisplayReality);
  const displayGantt = useSelector(selectDisplayGantt);
  return (
    <tr
      key={taskId}
      class="task-panel-task"
      style={`z-index: ${CSS_MAX_ZINDEX - (task?.orderNumber ?? 1)};`}
    >
      {/* Task info */}
      <td class="task-panel-info sticky-col-0">
        <PickColorControl taskId={taskId} />
      </td>
      <td class="task-panel-info sticky-col-1">
        <RemoveTaskControl taskId={taskId} />
      </td>
      <td class="task-panel-info sticky-col-2 hover-effect">
        <TaskNameControl taskId={taskId} />
      </td>
      <td class="task-panel-info sticky-col-3 hover-effect">
        <TaskOwnerControl taskId={taskId} />
      </td>
      {/* Space */}
      <td class="task-panel-space"></td>
      {/* Plan */}
      {displayPlan && (
        <>
          <td class="task-panel-plan plan-start-control hover-effect">
            <PlanStartDateControl taskId={taskId} />
          </td>
          <td class="task-panel-plan hover-effect">
            <PlanDurationIdealControl taskId={taskId} />
          </td>
          <td class="task-panel-plan hover-effect">
            <PlanDurationNormalControl taskId={taskId} />
          </td>
          <td class="task-panel-plan hover-effect">
            <PlanDurationBadControl taskId={taskId} />
          </td>
          <td class="task-panel-plan">
            <PlanDurationCalculatedControl taskId={taskId} />
          </td>
          <td class="task-panel-plan">
            <PlanEndDateControl taskId={taskId} />
          </td>
          {/* Space */}
          <td class="task-panel-space"></td>
        </>
      )}
      {/* Reality */}
      {displayReality && (
        <>
          <td class="task-panel-reality hover-effect">
            <RealityStartDateControl taskId={taskId} />
          </td>
          <td class="task-panel-reality">
            <RealityStartDelayControl taskId={taskId} />
          </td>
          <td class="task-panel-reality hover-effect">
            <RealityDoneControl taskId={taskId} />
          </td>
          <td class="task-panel-reality">
            <RealityEndDateControl taskId={taskId} />
          </td>
          <td class="task-panel-reality">
            <RealityEndDelayControl taskId={taskId} />
          </td>
          {/* Space */}
          <td class="task-panel-space"></td>
        </>
      )}
      {/* Gantt */}
      {displayGantt && (
        <>
          <td class="task-panel-gantt"></td>
          <td class="task-panel-gantt hover-effect">
            <GanttBarControl taskId={taskId} />
          </td>
          <td class="task-panel-gantt"></td>
        </>
      )}
    </tr>
  );
};
