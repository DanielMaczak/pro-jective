import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Category, Task, Settings } from '../../lib/tasks.lib';
import {
  colorByOptions,
  colorPickOptions,
  displayOptions,
  independentOptionId,
  sortByOptions,
  workdaysOptions,
} from '../../services/options.service';
import { RootState } from '../store';
import {
  CSS_NIGHTMODE,
  DAY_SEC,
  FIRST_DATE,
  LAST_DATE,
  ZOOM_MAX,
  ZOOM_MIN,
} from '../../services/constants.service';
import { Option } from 'irmas-preact-form-components';

export interface TasksSliceState {
  categories: { [key: string]: Category };
  tasks: { [key: string]: Task };
  settings: Settings;
  lists: {
    sortedCategories: string[];
  };
  properties: {
    popupTaskId: string | null;
    searchedValue: string;
    workdays: 5 | 6 | 7;
    zoomState: number;
  };
  error: string | null;
}

const isTasksSliceState = (
  stateCandidate: unknown
): stateCandidate is TasksSliceState => {
  return (
    typeof stateCandidate === 'object' &&
    stateCandidate !== null &&
    'categories' in stateCandidate &&
    'tasks' in stateCandidate &&
    'settings' in stateCandidate &&
    'lists' in stateCandidate
  );
};

const setInitialState = (
  state: TasksSliceState = <TasksSliceState>{}
): TasksSliceState => {
  state.categories = {};
  state.tasks = {};
  state.settings = {
    sortByOptionId: sortByOptions[0].id,
    workdaysOptionId: workdaysOptions[0].id,
    displayOptionIds: [
      displayOptions[0].id,
      displayOptions[1].id,
      displayOptions[2].id,
    ],
    colorByOptionId: colorByOptions[0].id,
    nightSwitchOn: false,
  };
  state.lists = {
    sortedCategories: [],
  };
  state.properties = {
    popupTaskId: null,
    searchedValue: '',
    workdays: 5,
    zoomState: 0,
  };
  state.error = null;
  return state;
};
const setInitialCategory = (
  state: TasksSliceState,
  newCategoryId: string
): Category => {
  return {
    id: newCategoryId,
    name: '',
    taskIds: [],
    inSearchResults: state.properties.searchedValue === '',
    info: {
      name: '',
    },
    plan: {
      startDate: null,
      endDate: null,
    },
    reality: {
      startDate: null,
      endDate: null,
    },
  };
};
const setInitialTask = (
  state: TasksSliceState,
  newTaskId: string,
  parentCategoryId: string
): Task => {
  return {
    id: newTaskId,
    categoryId: parentCategoryId,
    inSearchResults: state.properties.searchedValue === '',
    dependencyIds: [],
    dependentOnId: null,
    orderNumber: 0,
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
};

const copyProperties = (
  copyFrom: { [key: string]: any },
  copyTo: { [key: string]: any }
) => {
  Object.keys(copyFrom).forEach(key => {
    if (Object.hasOwn(copyTo, key)) {
      if (Array.isArray(copyFrom[key])) {
        (copyFrom[key] as []).forEach(value => {
          (copyTo[key] as []).push(value);
        });
      } else if (typeof copyFrom[key] === 'object' && copyFrom[key]) {
        copyProperties(copyFrom[key], copyTo[key]);
      } else {
        copyTo[key] = copyFrom[key];
      }
    }
  });
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

const getWeekday = (date: number): number => {
  return new Date(date).getUTCDay() || 7;
};

const getDate = (datetime: number): number => {
  return new Date(
    new Date(datetime).getUTCFullYear(),
    new Date(datetime).getUTCMonth(),
    new Date(datetime).getUTCDate()
  ).valueOf();
};

const addWorkdays = (
  startDate: number,
  addWorkdays: number,
  workdays: number
): number => {
  let endDate = Math.floor(startDate / DAY_SEC);
  endDate += Math.floor(addWorkdays / workdays) * 7;
  let startDayWeekday = getWeekday(startDate);
  let remainingDays = addWorkdays % workdays;
  endDate += remainingDays;
  if (startDayWeekday + remainingDays > 7) {
    endDate += workdays === 6 ? 1 : 2;
  } else if (startDayWeekday + remainingDays === 7 && workdays < 7) {
    endDate += workdays === 6 ? 1 : 2;
  } else if (startDayWeekday + remainingDays === 6 && workdays < 6) {
    endDate += 2;
  }
  return endDate * DAY_SEC;
};

const getNextWorkday = (date: number, workdays: number): number => {
  const weekday = getWeekday(date);
  return weekday > workdays ? (date += (8 - weekday) * DAY_SEC) : date;
};

const getSortField = (
  entry: Task | Category,
  state: TasksSliceState
): number => {
  switch (state.settings.sortByOptionId) {
    case sortByOptions[0].id:
      return entry.plan.startDate || 0;
    case sortByOptions[1].id:
      return entry.reality.startDate || 0;
  }
  return 0;
};

const sortData = (state: TasksSliceState) => {
  //  Sort categories
  const categories = Object.values(state.categories);
  state.lists.sortedCategories = categories
    .sort(
      (categoryA: Category, categoryB: Category) =>
        getSortField(categoryA, state) - getSortField(categoryB, state) ||
        categoryA.info.name.localeCompare(categoryB.info.name)
    )
    .map(category => category.id);
  //  Sort tasks within each category
  categories.forEach(category => {
    category.taskIds = category.taskIds.sort(
      (taskIdA: string, taskIdB: string) => {
        const taskA = state.tasks[taskIdA];
        const taskB = state.tasks[taskIdB];
        return (
          getSortField(taskA, state) - getSortField(taskB, state) ||
          taskA.info.name.localeCompare(taskB.info.name) ||
          taskA.info.owner.localeCompare(taskB.info.owner)
        );
      }
    );
  });
  //  Store order number
  let order = 0;
  categories.forEach(category => {
    category.taskIds.forEach((taskId: string) => {
      const task = state.tasks[taskId];
      task.orderNumber = ++order;
    });
  });
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: setInitialState(),
  reducers: {
    addCategory: state => {
      //  Verify valid state
      const newCategoryId = uuidv4();
      if (Object.hasOwn(state.categories, newCategoryId))
        state.error = `Duplicate category ID: ${newCategoryId}.`;
      //  Change state
      if (!state.error) {
        state.categories[newCategoryId] = setInitialCategory(
          state,
          newCategoryId
        );
        sortData(state);
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
        state.tasks[newTaskId] = setInitialTask(
          state,
          newTaskId,
          parentCategoryId
        );
        parentCategory.taskIds.push(newTaskId);
        sortData(state);
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
        sortData(state);
      }
    },

    changeDependency: (
      state,
      { payload: { dependentTaskId, anchorTaskId } }
    ) => {
      //  Verify valid state
      if (!Object.hasOwn(state.tasks, dependentTaskId))
        state.error = `Non-existent task ID: ${dependentTaskId}.`;
      const dependentTask = state.tasks[dependentTaskId];
      if (dependentTask.dependentOnId === anchorTaskId) return;
      //  Change state
      if (!state.error) {
        //  Remove old dependency
        if (dependentTask.dependentOnId !== null) {
          const oldAnchorTask = state.tasks[dependentTask.dependentOnId];
          oldAnchorTask.dependencyIds = oldAnchorTask.dependencyIds.filter(
            dependencyId => dependencyId !== dependentTaskId
          );
        }
        //  Add new dependency
        if (anchorTaskId !== null) {
          const newAnchorTask = state.tasks[anchorTaskId];
          newAnchorTask.dependencyIds.push(dependentTaskId);
          dependentTask.dependentOnId = anchorTaskId;
          dependentTask.plan.startDate = newAnchorTask.plan.endDate;
          dependentTask.reality.startDate = newAnchorTask.reality.endDate;
        }
        //  Or remove alltogether
        else {
          dependentTask.dependentOnId = null;
        }
        sortData(state);
      }
    },

    changeDisplaySetting: (state, { payload: { setting } }) => {
      //  Verify valid state
      if (!Array.isArray(setting))
        state.error = `Incompatible setting type: ${JSON.stringify(setting)}.`;
      const optionIds = displayOptions.map(option => option.id);
      if (!setting.every((value: string) => optionIds.includes(value)))
        state.error = `Non-existent option ID(s): ${JSON.stringify(setting)}.`;
      //  Change state
      if (!state.error) {
        state.settings.displayOptionIds = [...setting];
      }
    },

    changeSortBySetting: (state, { payload: { setting } }) => {
      //  Verify valid state
      if (typeof setting !== 'string')
        state.error = `Incompatible setting type: ${JSON.stringify(setting)}.`;
      const optionIds = sortByOptions.map(option => option.id);
      if (!optionIds.includes(setting))
        state.error = `Non-existent option ID: ${JSON.stringify(setting)}.`;
      //  Change state
      if (!state.error) {
        state.settings.sortByOptionId = setting;
        sortData(state);
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
      if (!Object.hasOwn(state.categories, changeTask.categoryId))
        state.error = `Non-existent category ID: ${changeTask.categoryId}.`;
      const category = state.categories[changeTask.categoryId];
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
          plan.startDate = getNextWorkday(
            getDate(plan.startDate),
            state.properties.workdays
          );
          plan.endDate = addWorkdays(
            plan.startDate,
            plan.durationCalculated,
            state.properties.workdays
          );
        } else plan.endDate = null;
        //  Recalculate reality
        if (real.startDate) {
          real.startDate = getNextWorkday(
            getDate(real.startDate),
            state.properties.workdays
          );
        }
        if (plan.startDate && real.startDate) {
          real.startDelay = Math.max(
            (real.startDate - plan.startDate) / DAY_SEC,
            0
          );
        } else real.startDelay = 0;
        if (plan.startDate && plan.endDate && real.startDate && !real.done) {
          real.endDate = addWorkdays(
            real.startDate,
            plan.durationCalculated,
            state.properties.workdays
          );
        } else if (real.startDate && real.done) {
          real.endDate = addWorkdays(
            real.startDate,
            Math.max(0, getDate(Date.now()) - real.startDate) /
              (real.done / 100) /
              DAY_SEC,
            state.properties.workdays
          );
        } else real.endDate = null;
        if (plan.endDate && real.endDate) {
          real.endDelay = Math.round(
            Math.max(0, (real.endDate - plan.endDate) / DAY_SEC)
          );
        } else real.endDelay = 0;
        //  Recalculate dependencies
        if (changeTask.dependencyIds.length) {
          changeTask.dependencyIds.forEach(dependentTaskId => {
            const dependentTask = state.tasks[dependentTaskId];
            dependentTask.plan.startDate = changeTask.plan.endDate;
            dependentTask.reality.startDate = changeTask.reality.endDate;
          });
        }
        //  Update category
        category.plan.startDate = category.taskIds.reduce(
          (startDate: number | null, taskId: string) => {
            const childTask = state.tasks[taskId];
            if (!startDate && childTask.plan.startDate) {
              return childTask.plan.startDate;
            } else if (startDate && childTask.plan.startDate) {
              return Math.min(startDate, childTask.plan.startDate);
            }
            return startDate;
          },
          null
        );
        category.plan.endDate = category.taskIds.reduce(
          (endDate: number | null, taskId: string) => {
            const childTask = state.tasks[taskId];
            if (!endDate && childTask.plan.endDate) {
              return childTask.plan.endDate;
            } else if (endDate && childTask.plan.endDate) {
              return Math.max(endDate, childTask.plan.endDate);
            }
            return endDate;
          },
          null
        );
        category.reality.startDate = category.taskIds.reduce(
          (startDate: number | null, taskId: string) => {
            const childTask = state.tasks[taskId];
            if (!startDate && childTask.reality.startDate) {
              return childTask.reality.startDate;
            } else if (startDate && childTask.reality.startDate) {
              return Math.min(startDate, childTask.reality.startDate);
            }
            return startDate;
          },
          null
        );
        category.reality.endDate = category.taskIds.reduce(
          (endDate: number | null, taskId: string) => {
            const childTask = state.tasks[taskId];
            if (!endDate && childTask.reality.endDate) {
              return childTask.reality.endDate;
            } else if (endDate && childTask.reality.endDate) {
              return Math.max(endDate, childTask.reality.endDate);
            }
            return endDate;
          },
          null
        );
        sortData(state);
      }
    },

    changeWorkdaysSetting: (state, { payload: { setting } }) => {
      //  Verify valid state
      if (typeof setting !== 'string')
        state.error = `Incompatible setting type: ${JSON.stringify(setting)}.`;
      const optionIds = workdaysOptions.map(option => option.id);
      if (!optionIds.includes(setting))
        state.error = `Non-existent option ID: ${JSON.stringify(setting)}.`;
      //  Change state
      if (!state.error) {
        state.settings.workdaysOptionId = setting;
        switch (setting) {
          case workdaysOptions[0].id:
            state.properties.workdays = 5;
            break;
          case workdaysOptions[1].id:
            state.properties.workdays = 6;
            break;
          case workdaysOptions[2].id:
            state.properties.workdays = 7;
            break;
        }
        sortData(state);
      }
    },

    loadFromFile: (state, { payload: { fileContents } }) => {
      if (!fileContents || typeof fileContents !== 'string')
        state.error = `Unusable file contents: ${JSON.stringify(
          fileContents
        )}.`;
      const loadedState: unknown = JSON.parse(fileContents);
      if (!state.error && isTasksSliceState(loadedState)) {
        setInitialState(state);
        Object.values(loadedState.categories).forEach(category => {
          copyProperties(
            category,
            (state.categories[category.id] = setInitialCategory(state, ''))
          );
        });
        Object.values(loadedState.tasks).forEach(task => {
          copyProperties(
            task,
            (state.tasks[task.id] = setInitialTask(state, '', ''))
          );
        });
        copyProperties(loadedState.settings, state.settings);
        copyProperties(loadedState.lists, state.lists);
        sortData(state);
      } else {
        state.error = `Cannot parse file as tasks: ${JSON.stringify(
          fileContents
        )}.`;
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
        sortData(state);
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
        sortData(state);
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
          category.inSearchResults = category.info.name
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
export const selectCanZoomIn = (state: RootState) => {
  return state.tasks.present.properties.zoomState > ZOOM_MIN;
};
export const selectCanZoomOut = (state: RootState) => {
  return state.tasks.present.properties.zoomState < ZOOM_MAX;
};
export const selectCategory = (categoryId: string) => (state: RootState) => {
  return Object.hasOwn(state.tasks.present.categories, categoryId)
    ? state.tasks.present.categories[categoryId]
    : undefined;
};
export const selectCategoryIds = (state: RootState) => {
  return state.tasks.present.lists.sortedCategories
    .map(categoryId => state.tasks.present.categories[categoryId])
    .map(category => (category.inSearchResults ? category.id : ''))
    .filter(categoryId => categoryId);
};
export const selectTaskColor = (taskId: string) => (state: RootState) => {
  return colorPickOptions.find(
    option => option.id === state.tasks.present.tasks[taskId].info.colorOptionId
  );
};
export const selectDepedentOptions = (taskId: string) => (state: RootState) => {
  const options: Option[] = [{ id: independentOptionId, value: 'Independent' }];
  Object.values(state.tasks.present.tasks).forEach(task => {
    task.id !== taskId &&
      task.info.name &&
      options.push({ id: task.id, value: task.info.name });
  });
  return options;
};
export const selectDisplaySetting = (state: RootState) => {
  return state.tasks.present.settings.displayOptionIds;
};
export const selectDisplayPlan = (state: RootState) => {
  return state.tasks.present.settings.displayOptionIds.includes(
    displayOptions[0].id
  );
};
export const selectDisplayReality = (state: RootState) => {
  return state.tasks.present.settings.displayOptionIds.includes(
    displayOptions[1].id
  );
};
export const selectDisplayGantt = (state: RootState) => {
  return state.tasks.present.settings.displayOptionIds.includes(
    displayOptions[2].id
  );
};
export const selectNightSwitchOn = (state: RootState) => {
  return state.tasks.present.settings.nightSwitchOn;
};
export const selectMaxDate = (state: RootState) => {
  return Object.values(state.tasks.present.tasks).reduce(
    (max, task) =>
      Math.max(
        max,
        task.plan.endDate || LAST_DATE,
        task.reality.endDate || LAST_DATE
      ),
    LAST_DATE
  );
};
export const selectMinDate = (state: RootState) => {
  return Object.values(state.tasks.present.tasks).reduce(
    (min, task) =>
      Math.min(
        min,
        task.plan.startDate || FIRST_DATE,
        task.reality.startDate || FIRST_DATE
      ),
    FIRST_DATE
  );
};
export const selectSortBySetting = (state: RootState) => {
  return sortByOptions.find(
    option => option.id === state.tasks.present.settings.sortByOptionId
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
export const selectWorkdays = (state: RootState) => {
  return state.tasks.present.properties.workdays;
};
export const selectWorkdaysSetting = (state: RootState) => {
  return workdaysOptions.find(
    option => option.id === state.tasks.present.settings.workdaysOptionId
  );
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

export const {
  addCategory,
  addTask,
  changeCategory,
  changeDependency,
  changeDisplaySetting,
  changeSortBySetting,
  changeTask,
  changeWorkdaysSetting,
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
