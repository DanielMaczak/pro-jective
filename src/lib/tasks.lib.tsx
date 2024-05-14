import { Option } from 'irmas-preact-form-components';

export interface Category {
  [index: string]: any;
  id: string;
  name: string;
  taskIds: string[];
}
export interface Task {
  [index: string]: any;
  id: string;
  categoryId: string;
  info: {
    colorOptionId: string;
    name: string;
    owner: string;
    commentary?: string;
  };
  plan: {
    startDate: number;
    dependency?: string | Option;
    durationIdeal: number;
    durationNormal: number;
    durationBad: number;
    durationCalculated: number;
    endDate: number;
  };
  reality: {
    startDate: number;
    startDelay: number;
    done: number;
    endDate: number;
    endDelay: number;
  };
}
export interface Settings {
  sortByOptionId: string;
  workdaysOptionId: string;
  displayOptionId: string;
  colorByOptionId: string;
  nightSwitchOn: boolean;
  zoomState: number;
}
