import { Data } from '../lib/data.lib';

export const fakeData: Data = {
  categories: [
    {
      id: 'category-0',
      name: 'Regular tasks',
      tasks: [
        {
          id: 'task-0',
          info: { color: 'color-pick-0', name: 'Wash dishes', owner: 'Le me' },
          plan: {
            startDate: 1715286061264,
            durationIdeal: 2,
            durationNormal: 3,
            durationBad: 5,
          },
          reality: { startDate: 1715286061264, done: 0.3 },
        },
        {
          id: 'task-3',
          info: { color: 'color-pick-1', name: 'Make bed', owner: 'Le me' },
          plan: {
            startDate: 1715286061264,
            durationIdeal: 1,
            durationNormal: 5,
            durationBad: 20,
          },
          reality: { startDate: 1715286061264, done: 0.1 },
        },
      ],
    },
    {
      id: 'category-1',
      name: 'Super important tasks',
      tasks: [
        {
          id: 'task-1',
          info: { color: 'color-pick-0', name: 'Find job', owner: 'Me again' },
          plan: {
            startDate: 1715286061264,
            durationIdeal: 2,
            durationNormal: 3,
            durationBad: 5,
          },
          reality: { startDate: 1715286061264, done: 0.3 },
        },
        {
          id: 'task-2',
          info: { color: 'color-pick-2', name: 'Make mom proud', owner: 'Me' },
          plan: {
            startDate: 1715286061264,
            durationIdeal: 1,
            durationNormal: 5,
            durationBad: 20,
          },
          reality: { startDate: 1715286061264, done: 0.1 },
        },
      ],
    },
  ],
};
