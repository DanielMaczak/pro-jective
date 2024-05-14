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

export interface TasksSliceState {
  categories: { [key: string]: Category };
  tasks: { [key: string]: Task };
  settings: Settings;
  lists: {
    sortedCategories: string[];
    sortedTasks: string[];
    filteredTasks: string[];
  };
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
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addCategory: state => {
      const newCategoryId = uuidv4();
      state.categories[newCategoryId] = {
        id: newCategoryId,
        name: '',
        taskIds: [],
      };
    },
    changeCategory: (state, { payload: { categoryId, property, value } }) => {
      if (!Object.hasOwn(state.categories, categoryId)) return;
      const changeCategory: Category = state.categories[categoryId];
      if (!Object.hasOwn(changeCategory, property)) return;
      if (typeof value === 'object') return; // only allow writing values
      if (typeof changeCategory[property] !== typeof value) return;
      changeCategory[property] = value;
    },
    removeCategory: (state, { payload }) => {
      if (!Object.hasOwn(state.categories, payload.categoryId)) return;
      state.categories[payload.removeCategoryId].taskIds.forEach(taskId => {
        delete state.tasks[taskId];
      });
      delete state.categories[payload.removeCategoryId];
    },
    addTask: (state, { payload }) => {
      const parentCategory = state.categories[payload.parentCategoryId];
      const newTaskId = uuidv4();
      state.tasks[newTaskId] = {
        id: newTaskId,
        categoryId: payload.parentCategoryId,
        info: {
          colorOptionId: colorPickOptions[0].id,
          name: '',
          owner: '',
          commentary: '',
        },
        plan: {
          startDate: 0,
          durationIdeal: 1,
          durationNormal: 1,
          durationBad: 1,
          durationCalculated: 1,
          endDate: 1,
        },
        reality: {
          startDate: 0,
          startDelay: 0,
          done: 0,
          endDate: 1,
          endDelay: 0,
        },
      };
      parentCategory.taskIds.push(newTaskId);
    },
    changeTask: (
      state,
      { payload: { taskId, propertyGroup, property, value } }
    ) => {
      if (!Object.hasOwn(state.tasks, taskId)) return;
      const changeTask: Task = state.tasks[taskId];
      if (!Object.hasOwn(changeTask, propertyGroup)) return;
      const changePropertyGroup = changeTask[propertyGroup];
      if (!Object.hasOwn(changePropertyGroup, property)) return;
      if (typeof value === 'object') return; // only allow writing values
      if (typeof changePropertyGroup[property] !== typeof value) return;
      changePropertyGroup[property] = value;
      //  Calculations
      changeTask.plan.durationNormal = Math.max(
        changeTask.plan.durationIdeal,
        changeTask.plan.durationNormal
      );
      changeTask.plan.durationBad = Math.max(
        changeTask.plan.durationNormal,
        changeTask.plan.durationBad
      );
      changeTask.plan.durationCalculated = Math.round(
        (changeTask.plan.durationIdeal +
          4 * changeTask.plan.durationNormal +
          changeTask.plan.durationBad) /
          6
      );
      changeTask.plan.endDate =
        changeTask.plan.startDate +
        changeTask.plan.durationCalculated * 86400000;
      changeTask.reality.startDelay =
        (changeTask.reality.startDate - changeTask.plan.startDate) / 86400000;
      changeTask.reality.endDate =
        changeTask.reality.done === 0
          ? changeTask.reality.startDate +
            changeTask.plan.endDate -
            changeTask.plan.startDate
          : changeTask.reality.startDate +
            (Date.now() - changeTask.reality.startDate) /
              changeTask.reality.done;
      changeTask.reality.endDelay =
        (changeTask.reality.endDate - changeTask.plan.endDate) / 86400000;
    },
    removeTask: (state, { payload }) => {
      const parentCategoryId = state.tasks[payload.removeTaskId].categoryId;
      const parentCategory = state.categories[parentCategoryId];
      parentCategory.taskIds = parentCategory.taskIds.filter(
        taskId => taskId !== payload.removeTaskId
      );
      delete state.tasks[payload.removeTaskId];
    },
  },
});

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

export const {
  addCategory,
  changeCategory,
  removeCategory,
  addTask,
  changeTask,
  removeTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
