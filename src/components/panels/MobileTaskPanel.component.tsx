import { useSelector } from 'react-redux';

import { Category } from '../../lib/tasks.lib';
import { ZoomInOutControl } from '../control-panel/ZoomInOutControl.component';
import { CategoryNameControl } from '../task-panel/CategoryNameControl.component';
import { GanttBarControl } from '../task-panel/GanttBarControl.component';
import { AddCategoryControl } from '../task-panel/AddCategoryControl.component';
import { AddTaskControl } from '../task-panel/AddTaskControl.component';
import {
  selectCategories,
  selectTasks,
} from '../../app/reducers/tasks.reducer';

export const MobileTaskPanel = () => {
  const categories = useSelector(selectCategories);
  const tasks = useSelector(selectTasks);
  return (
    <>
      <div className="task-panel">
        <div className="task-panel-scroll-area">
          <div className="task-panel-table">
            {/* Header */}
            <div className="task-panel-header">
              <div className="task-panel-header-row">
                <AddCategoryControl />
                <ZoomInOutControl />
              </div>
            </div>
            {/* Body */}
            <div className="task-panel-body">
              {Object.values(categories).map((category: Category) => (
                <>
                  <div key={category.id} className="task-panel-category">
                    <div className="task-panel-gantt">
                      <AddTaskControl parentCategoryId={category.id} />
                      <CategoryNameControl categoryId={category.id} />
                    </div>
                  </div>
                  {category.taskIds.map((taskId: string) => (
                    <div key={taskId} className="task-panel-task">
                      <div className="gantt-bar-info">
                        {tasks[taskId].info.name +
                          ' / ' +
                          tasks[taskId].info.owner}
                      </div>
                      <div className="task-panel-gantt hover-effect">
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
