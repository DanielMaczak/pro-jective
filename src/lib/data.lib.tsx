export interface Data {
  categories: Category[];
}
export interface Category {
  id: string;
  name: string;
  tasks: Task[];
}
export interface Task {
  id: string;
  info: {
    color: string;
    name: string;
    owner: string;
    commentary?: string;
  };
  plan: {
    startDate: number;
    dependency?: string;
    durationIdeal: number;
    durationNormal: number;
    durationBad: number;
  };
  reality: {
    startDate: number;
    done: number;
  };
}
