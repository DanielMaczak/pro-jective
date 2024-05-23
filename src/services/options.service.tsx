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
/**
 * @link https://webgradients.com/
 */
export const colorPickOptions: Option[] = [
  { id: 'color-pick-0', value: 'None', color: 'transparent' },
  {
    id: 'color-pick-5',
    value: '084 Phoenix Start',
    color: 'linear-gradient(to top, #f83600 0%, #f9d423 100%);',
  },
  {
    id: 'color-pick-6',
    value: '073 Love Kiss',
    color: 'linear-gradient(to top, #ff0844 0%, #ffb199 100%);',
  },
  {
    id: 'color-pick-7',
    value: '055 Sharp Blues',
    color: 'linear-gradient(to bottom, #00c6fb 0%, #005bea 100%);',
  },
  {
    id: 'color-pick-10',
    value: '090 Mars Party',
    color: 'linear-gradient(to bottom, #5f72bd 0%, #9b23ea 100%);',
  },
  {
    id: 'color-pick-8',
    value: '054 Grown Early',
    color: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%);',
  },
  {
    id: 'color-pick-9',
    value: '091 Eternal Constance',
    color: 'linear-gradient(to top, #09203f 0%, #537895 100%);',
  },
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
    color: 'Task color',
    name: 'Name',
    owner: 'Owner',
    commentary: 'Commentary',
  },
  plan: {
    startDate: 'Start date',
    durationIdeal: 'Optimal length',
    durationNormal: 'Anticipated',
    durationBad: 'Maximum length',
    durationCalculated: 'Forecasted',
    endDate: 'End date',
  },
  reality: {
    startDate: 'Start date',
    startDelay: 'Start delay',
    done: 'Done',
    endDate: 'End date',
    endDelay: 'End delay',
  },
};

Object.freeze(displayOptions);
Object.freeze(colorByOptions);
Object.freeze(colorPickOptions);
Object.freeze(sortByOptions);
Object.freeze(workdaysOptions);
Object.freeze(metricHeaders);
