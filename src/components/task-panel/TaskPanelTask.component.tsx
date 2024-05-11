import { Task } from '../../lib/data.lib';
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
import { TaskNameControl } from './TaskNameControl.component';
import { TaskOwnerControl } from './TaskOwnerControl.component';

export const TaskPanelTask = ({ task }: { task: Task }) => {
  return (
    <tr key={task.id} className="task-panel-task">
      {/* Task info */}
      <td className="task-panel-info sticky-col-0">
        <PickColorControl color={task.info.color} />
      </td>
      <td className="task-panel-info sticky-col-1 hover-effect">
        <TaskNameControl name={task.info.name} />
      </td>
      <td className="task-panel-info sticky-col-2 hover-effect">
        <TaskOwnerControl owner={task.info.owner} />
      </td>
      {/* Space */}
      <td className="task-panel-space"></td>
      {/* Plan */}
      <td className="task-panel-plan hover-effect">
        <PlanStartDateControl startDateInput={task.plan.startDate} />
      </td>
      <td className="task-panel-plan hover-effect">
        <PlanDurationIdealControl durationInput={task.plan.durationIdeal} />
      </td>
      <td className="task-panel-plan hover-effect">
        <PlanDurationNormalControl durationInput={task.plan.durationNormal} />
      </td>
      <td className="task-panel-plan hover-effect">
        <PlanDurationBadControl durationInput={task.plan.durationBad} />
      </td>
      <td className="task-panel-plan">
        <PlanDurationCalculatedControl />
      </td>
      <td className="task-panel-plan">
        <PlanEndDateControl />
      </td>
      {/* Space */}
      <td className="task-panel-space"></td>
      {/* Reality */}
      <td className="task-panel-reality hover-effect">
        <RealityStartDateControl startDateInput={task.reality.startDate} />
      </td>
      <td className="task-panel-reality">
        <RealityStartDelayControl />
      </td>
      <td className="task-panel-reality hover-effect">
        <RealityDoneControl doneInput={task.reality.done} />
      </td>
      <td className="task-panel-reality">
        <RealityEndDateControl />
      </td>
      <td className="task-panel-reality">
        <RealityEndDelayControl />
      </td>
      {/* Space */}
      <td className="task-panel-space"></td>
      {/* Gantt */}
      <td className="task-panel-gantt"></td>
      <td className="task-panel-gantt hover-effect">
        <GanttBarControl />
      </td>
      <td className="task-panel-gantt"></td>
    </tr>
  );
};
