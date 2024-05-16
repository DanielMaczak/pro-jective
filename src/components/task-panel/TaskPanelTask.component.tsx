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

export const TaskPanelTask = ({
  taskId,
  tablet,
}: {
  taskId: string;
  tablet: boolean;
}) => {
  return (
    <tr key={taskId} className="task-panel-task">
      {/* Task info */}
      <td className="task-panel-info sticky-col-0">
        <PickColorControl taskId={taskId} />
      </td>
      <td className="task-panel-info sticky-col-1">
        <RemoveTaskControl taskId={taskId} />
      </td>
      <td className="task-panel-info sticky-col-2 hover-effect">
        <TaskNameControl taskId={taskId} />
      </td>
      <td className="task-panel-info sticky-col-3 hover-effect">
        <TaskOwnerControl taskId={taskId} />
      </td>
      {/* Space */}
      <td className="task-panel-space"></td>
      {!tablet && (
        <>
          {/* Plan */}
          <td className="task-panel-plan plan-start-control hover-effect">
            <PlanStartDateControl taskId={taskId} />
          </td>
          <td className="task-panel-plan hover-effect">
            <PlanDurationIdealControl taskId={taskId} />
          </td>
          <td className="task-panel-plan hover-effect">
            <PlanDurationNormalControl taskId={taskId} />
          </td>
          <td className="task-panel-plan hover-effect">
            <PlanDurationBadControl taskId={taskId} />
          </td>
          <td className="task-panel-plan">
            <PlanDurationCalculatedControl taskId={taskId} />
          </td>
          <td className="task-panel-plan">
            <PlanEndDateControl taskId={taskId} />
          </td>
          {/* Space */}
          <td className="task-panel-space"></td>
          {/* Reality */}
          <td className="task-panel-reality hover-effect">
            <RealityStartDateControl taskId={taskId} />
          </td>
          <td className="task-panel-reality">
            <RealityStartDelayControl taskId={taskId} />
          </td>
          <td className="task-panel-reality hover-effect">
            <RealityDoneControl taskId={taskId} />
          </td>
          <td className="task-panel-reality">
            <RealityEndDateControl taskId={taskId} />
          </td>
          <td className="task-panel-reality">
            <RealityEndDelayControl taskId={taskId} />
          </td>
          {/* Space */}
          <td className="task-panel-space"></td>
        </>
      )}
      {/* Gantt */}
      <td className="task-panel-gantt"></td>
      <td className="task-panel-gantt hover-effect">
        <GanttBarControl taskId={taskId} />
      </td>
      <td className="task-panel-gantt"></td>
    </tr>
  );
};
