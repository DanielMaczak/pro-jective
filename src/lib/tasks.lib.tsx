import { Option } from 'irmas-preact-form-components';

export interface Category {
  [index: string]: any;
  id: string;
  name: string;
  taskIds: string[];
  inSearchResults: boolean;
}
export interface Task {
  [index: string]: any;
  id: string;
  categoryId: string;
  inSearchResults: boolean;
  info: {
    colorOptionId: string;
    name: string;
    owner: string;
    commentary: string;
  };
  plan: {
    startDate: number | null;
    dependency?: string | Option;
    durationIdeal: number;
    durationNormal: number;
    durationBad: number;
    durationCalculated: number;
    endDate: number | null;
  };
  reality: {
    startDate: number | null;
    startDelay: number;
    done: number;
    endDate: number | null;
    endDelay: number;
  };
}
export interface Settings {
  sortByOptionId: string;
  workdaysOptionId: string;
  displayOptionIds: string[];
  colorByOptionId: string;
  nightSwitchOn: boolean;
}
