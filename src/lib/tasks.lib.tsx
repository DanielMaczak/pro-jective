export interface Category {
  [index: string]: any;
  id: string;
  taskIds: string[];
  inSearchResults: boolean;
  info: {
    name: string;
  };
  plan: {
    startDate: number | null;
    endDate: number | null;
  };
  reality: {
    startDate: number | null;
    endDate: number | null;
  };
}
export interface Task {
  [index: string]: any;
  id: string;
  categoryId: string;
  dependencyIds: string[];
  dependentOnId: string | null;
  inSearchResults: boolean;
  info: {
    colorOptionId: string;
    name: string;
    owner: string;
    commentary: string;
  };
  plan: {
    startDate: number | null;
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
