import { Category, Task } from '../../lib/data.lib';
import { fakeData } from '../../services/fake-data.service';
import { ZoomInOutControl } from '../control-panel/ZoomInOutControl.component';
import { CategoryNameControl } from '../task-panel/CategoryNameControl.component';
import { GanttBarControl } from '../task-panel/GanttBarControl.component';
import { NewCategoryControl } from '../task-panel/NewCategoryControl.component';
import { NewTaskControl } from '../task-panel/NewTaskControl.component';

export const MobileTaskPanel = () => {
  return (
    <>
      <div className="task-panel">
        <div className="task-panel-scroll-area">
          <div className="task-panel-table">
            {/* Header */}
            <div className="task-panel-header">
              <div className="task-panel-header-row">
                <div className="task-panel-gantt">
                  <NewCategoryControl />
                  <h3>Gantt chart</h3>
                  <ZoomInOutControl />
                </div>
              </div>
            </div>
            {/* Body */}
            <div className="task-panel-body">
              {fakeData.categories.map((category: Category) => (
                <>
                  <div key={category.id} className="task-panel-category">
                    <div className="task-panel-gantt">
                      <NewTaskControl />
                      <CategoryNameControl name={category.name} />
                    </div>
                  </div>
                  {category.tasks.map((task: Task) => (
                    <div key={task.id} className="task-panel-task">
                      <div className="task-panel-gantt hover-effect">
                        <div className="gantt-bar-info">
                          {task.info.name + ' / ' + task.info.owner}
                        </div>
                        <GanttBarControl />
                      </div>
                    </div>
                  ))}
                </>
              ))}
            </div>
            {/* Footer */}
            <div className="task-panel-footer">
              <div className="task-panel-footer-row"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
