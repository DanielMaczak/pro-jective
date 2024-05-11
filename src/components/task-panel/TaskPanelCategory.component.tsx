import { Category, Task } from '../../lib/data.lib';
import { fakeData } from '../../services/fake-data.service';
import { CategoryNameControl } from './CategoryNameControl.component';
import { NewTaskControl } from './NewTaskControl.component';
import { TaskPanelTask } from './TaskPanelTask.component';

export const TaskPanelCategory = () => {
  return (
    <tbody className="task-panel-body">
      {fakeData.categories.map((category: Category) => (
        <>
          <tr key={category.id} className="task-panel-category">
            {/* Task info */}
            <td className="task-panel-info sticky-col-0">
              <NewTaskControl />
            </td>
            <td className="task-panel-info sticky-col-1">
              <CategoryNameControl name={category.name} />
            </td>
            <td className="task-panel-info sticky-col-2"></td>
            {/* Space */}
            <td className="task-panel-space"></td>
            {/* Plan */}
            <td className="task-panel-plan"></td>
            <td className="task-panel-plan"></td>
            <td className="task-panel-plan"></td>
            <td className="task-panel-plan"></td>
            <td className="task-panel-plan"></td>
            <td className="task-panel-plan"></td>
            {/* Space */}
            <td className="task-panel-space"></td>
            {/* Reality */}
            <td className="task-panel-reality"></td>
            <td className="task-panel-reality"></td>
            <td className="task-panel-reality"></td>
            <td className="task-panel-reality"></td>
            <td className="task-panel-reality"></td>
            {/* Space */}
            <td className="task-panel-space"></td>
            {/* Gantt */}
            <td className="task-panel-gantt"></td>
            <td className="task-panel-gantt"></td>
            <td className="task-panel-gantt"></td>
          </tr>
          {category.tasks.map((task: Task) => (
            <TaskPanelTask task={task} />
          ))}
        </>
      ))}
    </tbody>
  );
};
