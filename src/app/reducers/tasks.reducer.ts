import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Category, Task, Settings } from '../../lib/tasks.lib';
import {
  colorByOptions,
  colorPickOptions,
  displayOptions,
  sortByOptions,
  workdaysOptions,
} from '../../services/options.service';
import { RootState } from '../store';
import { DAY_SEC } from '../../services/constants.service';

export interface TasksSliceState {
  categories: { [key: string]: Category };
  tasks: { [key: string]: Task };
  settings: Settings;
  lists: {
    sortedCategories: string[];
    sortedTasks: string[];
    filteredTasks: string[];
  };
  properties: {
    minDate: number | null;
    popupTaskId: string | null;
  };
  error: string | null;
}

const initialState: TasksSliceState = {
  categories: {},
  tasks: {},
  settings: {
    sortByOptionId: sortByOptions[0].id,
    workdaysOptionId: workdaysOptions[0].id,
    displayOptionId: displayOptions[0].id,
    colorByOptionId: colorByOptions[0].id,
    nightSwitchOn: false,
    zoomState: 0,
  },
  lists: {
    sortedCategories: [],
    sortedTasks: [],
    filteredTasks: [],
  },
  properties: {
    minDate: null,
    popupTaskId: null,
  },
  // TODO: https://stackoverflow.com/a/58299220
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    showTask: (state, { payload: { taskId } }) => {
      //  Check to toggle popup off
      if (!taskId) {
        state.properties.popupTaskId = null;
        return;
      }
      //  Verify valid state
      if (!Object.hasOwn(state.tasks, taskId))
        state.error = `Non-existent task ID: ${taskId}.`;
      //  Change state
      if (!state.error) {
        state.properties.popupTaskId = taskId;
      }
    },

    addCategory: state => {
      //  Verify valid state
      const newCategoryId = uuidv4();
      if (Object.hasOwn(state.categories, newCategoryId))
        state.error = `Duplicate category ID: ${newCategoryId}.`;
      //  Change state
      if (!state.error) {
        state.categories[newCategoryId] = {
          id: newCategoryId,
          name: '',
          taskIds: [],
        };
      }
    },

    changeCategory: (state, { payload: { categoryId, property, value } }) => {
      //  Verify valid state
      if (!Object.hasOwn(state.categories, categoryId))
        state.error = `Non-existent category ID: ${categoryId}.`;
      const changeCategory: Category = state.categories[categoryId];
      if (!Object.hasOwn(changeCategory, property))
        state.error = `Non-existent category property: ${property}.`;
      if (typeof value === 'object')
        state.error = `Attempted to assign object: ${JSON.stringify(value)}.`;
      //  Change state
      if (!state.error) {
        changeCategory[property] = value;
      }
    },

    removeCategory: (state, { payload: { removeCategoryId } }) => {
      //  Verify valid state
      if (!Object.hasOwn(state.categories, removeCategoryId))
        state.error = `Non-existent category ID: ${removeCategoryId}.`;
      //  Change state
      if (!state.error) {
        state.categories[removeCategoryId].taskIds.forEach(taskId => {
          delete state.tasks[taskId];
        });
        delete state.categories[removeCategoryId];
      }
    },

    addTask: (state, { payload: { parentCategoryId } }) => {
      //  Verify valid state
      if (!Object.hasOwn(state.categories, parentCategoryId))
        state.error = `Non-existent category ID: ${parentCategoryId}.`;
      const parentCategory = state.categories[parentCategoryId];
      const newTaskId = uuidv4();
      if (Object.hasOwn(state.tasks, newTaskId))
        state.error = `Duplicate task ID: ${newTaskId}.`;
      //  Change state
      if (!state.error) {
        state.tasks[newTaskId] = {
          id: newTaskId,
          categoryId: parentCategoryId,
          info: {
            colorOptionId: colorPickOptions[0].id,
            name: '',
            owner: '',
            commentary: '',
          },
          plan: {
            startDate: null,
            durationIdeal: 1,
            durationNormal: 1,
            durationBad: 1,
            durationCalculated: 1,
            endDate: null,
          },
          reality: {
            startDate: null,
            startDelay: 0,
            done: 0,
            endDate: null,
            endDelay: 0,
          },
        };
        parentCategory.taskIds.push(newTaskId);
      }
    },

    changeTask: (
      state,
      { payload: { taskId, propertyGroup, property, value } }
    ) => {
      //  Verify valid state
      if (!Object.hasOwn(state.tasks, taskId))
        state.error = `Non-existent task ID: ${taskId}.`;
      const changeTask: Task = state.tasks[taskId];
      if (!Object.hasOwn(changeTask, propertyGroup))
        state.error = `Non-existent task property group: ${propertyGroup}.`;
      const changePropertyGroup = changeTask[propertyGroup];
      if (!Object.hasOwn(changePropertyGroup, property))
        state.error = `Non-existent task property: ${property}.`;
      if (typeof value === 'object')
        state.error = `Attempted to assign object: ${JSON.stringify(value)}.`;
      //  Change state
      if (!state.error) {
        changePropertyGroup[property] = value;
        const plan = changeTask.plan;
        const real = changeTask.reality;
        //  Recalculate duration
        plan.durationNormal = Math.max(plan.durationIdeal, plan.durationNormal);
        plan.durationBad = Math.max(plan.durationNormal, plan.durationBad);
        plan.durationCalculated = Math.round(
          (plan.durationIdeal + plan.durationNormal * 4 + plan.durationBad) / 6
        );
        //  Recalculate plan
        if (plan.startDate) {
          plan.endDate =
            plan.startDate + Math.max(0, plan.durationCalculated * DAY_SEC);
        } else plan.endDate = null;
        //  Recalculate reality
        if (plan.startDate && real.startDate) {
          real.startDelay = Math.max(
            (real.startDate - plan.startDate) / DAY_SEC,
            0
          );
        } else real.startDelay = 0;
        if (plan.startDate && plan.endDate && real.startDate && !real.done) {
          real.endDate = real.startDate + plan.endDate - plan.startDate;
        } else if (real.startDate && real.done) {
          real.endDate =
            real.startDate +
            Math.max(0, Date.now() - real.startDate) / (real.done / 100);
        } else real.endDate = null;
        if (plan.endDate && real.endDate) {
          real.endDelay = Math.round(
            Math.max(0, (real.endDate - plan.endDate) / DAY_SEC)
          );
        } else real.endDelay = 0;
        //  Update plan start date
        const dates: number[] = [];
        typeof state.properties.minDate === 'number' &&
          dates.push(state.properties.minDate);
        typeof plan.startDate === 'number' && dates.push(plan.startDate);
        typeof real.startDate === 'number' && dates.push(real.startDate);
        if (dates.length) state.properties.minDate = Math.min(...dates);
      }
    },

    removeTask: (state, { payload: { removeTaskId } }) => {
      //  Verify valid state
      if (!Object.hasOwn(state.tasks, removeTaskId))
        state.error = `Non-existent task ID: ${removeTaskId}.`;
      const parentCategoryId = state.tasks[removeTaskId].categoryId;
      if (!Object.hasOwn(state.categories, parentCategoryId))
        state.error = `Non-existent category ID: ${parentCategoryId}.`;
      const parentCategory = state.categories[parentCategoryId];
      //  Change state
      if (!state.error) {
        parentCategory.taskIds = parentCategory.taskIds.filter(
          taskId => taskId !== removeTaskId
        );
        delete state.tasks[removeTaskId];
      }
    },
  },
});

export const selectMinDate = (state: RootState) => {
  return state.tasks.present.properties.minDate;
};
export const selectCategoryIds = (state: RootState) => {
  return Object.keys(state.tasks.present.categories);
};
export const selectCategory = (categoryId: string) => (state: RootState) => {
  return Object.hasOwn(state.tasks.present.categories, categoryId)
    ? state.tasks.present.categories[categoryId]
    : undefined;
};
export const selectTaskIds = (categoryId: string) => (state: RootState) => {
  return Object.hasOwn(state.tasks.present.categories, categoryId)
    ? state.tasks.present.categories[categoryId].taskIds
    : undefined;
};
export const selectTask = (taskId: string) => (state: RootState) => {
  return Object.hasOwn(state.tasks.present.tasks, taskId)
    ? state.tasks.present.tasks[taskId]
    : undefined;
};
export const selectTaskIdForPopup = (state: RootState) => {
  return state.tasks.present.properties.popupTaskId;
};

export const {
  showTask,
  addCategory,
  changeCategory,
  removeCategory,
  addTask,
  changeTask,
  removeTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
