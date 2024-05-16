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
import {
  CSS_NIGHTMODE,
  DAY_SEC,
  LAST_DATE,
  ZOOM_MAX,
  ZOOM_MIN,
} from '../../services/constants.service';

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
    popupTaskId: string | null;
    searchedValue: string;
    zoomState: number;
  };
  error: string | null;
}

const initialState: TasksSliceState = {
  categories: {},
  tasks: {},
  settings: {
    sortByOptionId: sortByOptions[0].id,
    workdaysOptionId: workdaysOptions[0].id,
    displayOptionIds: [
      displayOptions[0].id,
      displayOptions[1].id,
      displayOptions[2].id,
    ],
    colorByOptionId: colorByOptions[0].id,
    nightSwitchOn: false,
  },
  lists: {
    sortedCategories: [],
    sortedTasks: [],
    filteredTasks: [],
  },
  properties: {
    popupTaskId: null,
    searchedValue: '',
    zoomState: 0,
  },
  // TODO: https://stackoverflow.com/a/58299220
  error: null,
};

/**
 * @author https://github.com/stefanjudis
 * @link https://www.stefanjudis.com/snippets/how-trigger-file-downloads-with-javascript/
 */
const downloadFile = (file: File) => {
  // Create a link and set the URL using `createObjectURL`
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  // It needs to be added to the DOM so it can be clicked
  document.body.appendChild(link);
  link.click();
  // To make this work on Firefox we need to wait
  // a little while before removing it.
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode?.removeChild(link);
  }, 0);
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
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
          inSearchResults: state.properties.searchedValue === '',
        };
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
          inSearchResults: state.properties.searchedValue === '',
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
      }
    },

    loadFromFile: (state, { payload: { fileContents } }) => {
      if (!fileContents) return;
      const loadedState = JSON.parse(fileContents);

      // TODO: finish safe state update

      state.categories = {};

      if (loadedState?.categories) {
        Object.values(loadedState.categories).forEach((category: Category) => {
          state.categories[category.id] = {
            id: category.id,
            name: category.name,
            taskIds: [],
            inSearchResults: category.inSearchResults,
          };
        });
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

    saveToFile: state => {
      const file = new File(
        [JSON.stringify(state)],
        `pro-jective-${Date.now()}.json`
      );
      downloadFile(file);
    },

    search: (state, { payload: { searchedValue } }) => {
      //  Verify valid state
      if (typeof searchedValue !== 'string')
        state.error = `Searching non-string value: ${searchedValue}.`;
      //  Change state
      if (!state.error) {
        const searchedValueLowCase = searchedValue.toLowerCase();
        Object.values(state.categories).forEach(category => {
          category.inSearchResults = category.name
            .toLowerCase()
            .includes(searchedValueLowCase);
        });
        Object.values(state.tasks).forEach(task => {
          if (
            task.info.name.toLowerCase().includes(searchedValueLowCase) ||
            task.info.owner.toLowerCase().includes(searchedValueLowCase)
          ) {
            task.inSearchResults = true;
            state.categories[task.categoryId].inSearchResults = true;
          } else {
            task.inSearchResults = false;
          }
        });
        state.properties.searchedValue = searchedValue;
      }
    },

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

    switchLight: state => {
      state.settings.nightSwitchOn
        ? document.body.classList.remove(CSS_NIGHTMODE)
        : document.body.classList.add(CSS_NIGHTMODE);
      state.settings.nightSwitchOn = !state.settings.nightSwitchOn;
    },

    zoomIn: state => {
      //  Change state
      if (!state.error) {
        state.properties.zoomState > ZOOM_MIN && state.properties.zoomState--;
      }
    },

    zoomOut: state => {
      //  Change state
      if (!state.error) {
        state.properties.zoomState < ZOOM_MAX && state.properties.zoomState++;
      }
    },
  },
});

export const selectCanRedo = (state: RootState) => {
  return Boolean(state.tasks.future.length);
};
export const selectCanUndo = (state: RootState) => {
  return Boolean(state.tasks.past.length);
};
export const selectCategory = (categoryId: string) => (state: RootState) => {
  return Object.hasOwn(state.tasks.present.categories, categoryId)
    ? state.tasks.present.categories[categoryId]
    : undefined;
};
export const selectCategoryIds = (state: RootState) => {
  return Object.values(state.tasks.present.categories)
    .map(category => (category.inSearchResults ? category.id : undefined))
    .filter(categoryId => categoryId);
};
export const selectNightSwitchOn = (state: RootState) => {
  return state.tasks.present.settings.nightSwitchOn;
};
export const selectMinDate = (state: RootState) => {
  return Object.values(state.tasks.present.tasks).reduce(
    (min, task) =>
      Math.min(
        min,
        task.plan.startDate || LAST_DATE,
        task.reality.startDate || LAST_DATE
      ),
    LAST_DATE
  );
};
export const selectTask = (taskId: string) => (state: RootState) => {
  return Object.hasOwn(state.tasks.present.tasks, taskId)
    ? state.tasks.present.tasks[taskId]
    : undefined;
};
export const selectTaskIdForPopup = (state: RootState) => {
  return state.tasks.present.properties.popupTaskId;
};
export const selectTaskIds = (categoryId: string) => (state: RootState) => {
  return Object.hasOwn(state.tasks.present.categories, categoryId)
    ? state.tasks.present.categories[categoryId].taskIds.filter(
        taskId => state.tasks.present.tasks[taskId].inSearchResults
      )
    : undefined;
};
export const selectZoomCoef = (state: RootState) => {
  let zoomState = state.tasks.present.properties.zoomState;
  let zoomCoef = 1;
  if (zoomState > 0) {
    while (zoomState > 0) {
      zoomCoef /= 2;
      zoomState--;
    }
  } else {
    while (zoomState < 0) {
      zoomCoef *= 2;
      zoomState++;
    }
  }
  return zoomCoef;
};
export const selectZoomInPossible = (state: RootState) => {
  return state.tasks.present.properties.zoomState > ZOOM_MIN;
};
export const selectZoomOutPossible = (state: RootState) => {
  return state.tasks.present.properties.zoomState < ZOOM_MAX;
};

export const {
  addCategory,
  addTask,
  changeCategory,
  changeTask,
  loadFromFile,
  removeCategory,
  removeTask,
  saveToFile,
  search,
  showTask,
  switchLight,
  zoomIn,
  zoomOut,
} = tasksSlice.actions;
export default tasksSlice.reducer;
