import { Option } from 'irmas-preact-form-components';

export const independentOptionId: string = 'independent';
export const displayOptions: Option[] = [
  { id: 'display-0', value: 'Plan' },
  { id: 'display-1', value: 'Reality' },
  { id: 'display-2', value: 'Gantt' },
];
export const colorByOptions: Option[] = [
  { id: 'color-by-0', value: 'Custom' },
  { id: 'color-by-1', value: 'Owner' },
  { id: 'color-by-2', value: 'Category' },
];
export const colorPickOptions: Option[] = [
  { id: 'color-pick-0', value: 'None', color: 'transparent' },
  { id: 'color-pick-1', value: 'Green', color: '#aaa' },
  { id: 'color-pick-2', value: 'Blue', color: '#ccc' },
];
export const sortByOptions: Option[] = [
  { id: 'sort-by-0', value: 'Planned start date' },
  { id: 'sort-by-1', value: 'Real start date' },
];
export const workdaysOptions: Option[] = [
  { id: 'workdays-0', value: 'Mon-Fri' },
  { id: 'workdays-1', value: 'Mon-Sat' },
  { id: 'workdays-2', value: 'All days' },
];

export const metricHeaders = {
  info: {
    name: 'Name',
    owner: 'Owner',
    commentary: 'Commentary',
  },
  plan: {
    startDate: 'Start date',
    durationIdeal: 'Best possible duration',
    durationNormal: 'Expected duration',
    durationBad: 'Worst possible duration',
    durationCalculated: 'Forecasted duration',
    endDate: 'End date',
  },
  reality: {
    startDate: 'Start date',
    startDelay: 'Delay',
    done: 'Done',
    endDate: 'End date',
    endDelay: 'Delay',
  },
};

Object.freeze(displayOptions);
Object.freeze(colorByOptions);
Object.freeze(colorPickOptions);
Object.freeze(sortByOptions);
Object.freeze(workdaysOptions);
Object.freeze(metricHeaders);
