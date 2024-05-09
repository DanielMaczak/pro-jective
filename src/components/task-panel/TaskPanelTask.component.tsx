import { Task } from '../../lib/data.lib';
import { PickColorControl } from './PickColorControl.component';
import { PickDependencyControl } from './PickDependencyControl.component';
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
    <tr key={task.id} className="task-item">
      {/* Task info */}
      <td className="task-panel-info">
        <PickColorControl color={task.info.color} />
      </td>
      <td className="task-panel-info">
        <TaskNameControl name={task.info.name} />
      </td>
      <td className="task-panel-info">
        <TaskOwnerControl owner={task.info.owner} />
      </td>
      {/* Space */}
      <td className="task-panel-space"></td>
      {/* Plan */}
      <td className="task-panel-plan">
        <PlanStartDateControl startDateInput={task.plan.startDate} />
        <PickDependencyControl />
      </td>
      <td className="task-panel-plan">
        <PlanDurationIdealControl durationInput={task.plan.durationIdeal} />
      </td>
      <td className="task-panel-plan">
        <PlanDurationNormalControl durationInput={task.plan.durationNormal} />
      </td>
      <td className="task-panel-plan">
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
      <td className="task-panel-reality">
        <RealityStartDateControl startDateInput={task.reality.startDate} />
      </td>
      <td className="task-panel-reality">
        <RealityStartDelayControl />
      </td>
      <td className="task-panel-reality">
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
      <td className="task-panel-gantt"></td>
      <td className="task-panel-gantt"></td>
      <td className="task-panel-gantt"></td>
      <td className="task-panel-gantt"></td>
      <td className="task-panel-gantt"></td>
      <td className="task-panel-gantt"></td>
    </tr>
  );
};
