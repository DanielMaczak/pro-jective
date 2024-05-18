import { useSelector } from 'react-redux';

import { CategoryNameControl } from '../task-panel/CategoryNameControl.component';
import {
  GanttBarControl,
  GanttTimelineControl,
} from '../task-panel/GanttBarControl.component';
import { AddCategoryControl } from '../task-panel/AddCategoryControl.component';
import { AddTaskControl } from '../task-panel/AddTaskControl.component';
import {
  selectCategoryIds,
  selectTaskIds,
} from '../../app/reducers/tasks.reducer';
import { GanttBarInfoControl } from '../task-panel/GanttBarInfoControl.component';
import { ZoomInOutControl } from '../control-panel/ZoomInOutControl.component';
import { UndoRedoControl } from '../control-panel/UndoRedoControl.component';
import { MobileControlsButtonControl } from '../control-panel/MobileControlsButtonControl.component';

export const MobileTaskPanel = () => {
  return (
    <>
      <div class="task-panel">
        <div class="task-panel-scroll-area">
          <div class="task-panel-table">
            {/* Header */}
            <div class="task-panel-header">
              <AddCategoryControl />
              <ZoomInOutControl />
              <UndoRedoControl />
              <MobileControlsButtonControl />
            </div>
            <div class="task-panel-sub-header">
              <div class="task-panel-gantt">
                <GanttTimelineControl />
              </div>
            </div>
            {/* Body */}
            <div class="task-panel-body">
              {useSelector(selectCategoryIds).map((categoryId: string) => (
                <>
                  <div key={categoryId} class="task-panel-category">
                    <div class="task-panel-gantt">
                      <AddTaskControl parentCategoryId={categoryId} />
                      <CategoryNameControl categoryId={categoryId} />
                    </div>
                  </div>
                  {useSelector(selectTaskIds(categoryId))?.map(
                    (taskId: string) => (
                      <div key={taskId} class="task-panel-task">
                        <GanttBarInfoControl taskId={taskId} />
                        <div class="task-panel-gantt hover-effect">
                          <GanttBarControl taskId={taskId} />
                        </div>
                      </div>
                    )
                  )}
                </>
              ))}
            </div>
            {/* Footer */}
            <div class="task-panel-footer">
              <div class="task-panel-footer-row"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
