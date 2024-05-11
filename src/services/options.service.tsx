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
  { id: 'color-pick-0', value: 'None', color: 'transparent' },
  { id: 'color-pick-1', value: 'Green', color: '#aaa' },
  { id: 'color-pick-2', value: 'Blue', color: '#ccc' },
];

export const metricHeaders = {
  info_name: 'Name',
  info_owner: 'Owner',
  info_commentary: 'Commentary',
  plan_startDate: 'Start date',
  plan_durationIdeal: 'Best possible duration',
  plan_durationNormal: 'Expected duration',
  plan_durationBad: 'Worst possible duration',
  plan_durationCalculated: 'Forecasted duration',
  plan_endDate: 'End date',
  reality_startDate: 'Start date',
  reality_startDelay: 'Delay',
  reality_done: 'Done',
  reality_endDate: 'End date',
  reality_endDelay: 'Delay',
};

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
