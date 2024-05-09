import { Option } from 'irmas-preact-form-components';

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
  { id: 'color-pick-0', value: 'Red', color: '#ff0000' },
  { id: 'color-pick-1', value: 'Green', color: '#00ff00' },
  { id: 'color-pick-2', value: 'Blue', color: '#0000ff' },
];

export const sortByOptions: Option[] = [
  { id: 'sort-by-0', value: 'Planned start date' },
  { id: 'sort-by-1', value: 'Real start date' },
  { id: 'sort-by-2', value: 'Owner' },
  { id: 'sort-by-3', value: 'Task name' },
];

export const workdaysOptions: Option[] = [
  { id: 'workdays-0', value: 'Mon-Fri' },
  { id: 'workdays-1', value: 'Mon-Sat' },
  { id: 'workdays-2', value: 'All days' },
];
