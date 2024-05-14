import { configureStore } from '@reduxjs/toolkit';
import undoable from 'redux-undo';

import tasksSliceReducer from './reducers/tasks.reducer';

export const store = configureStore({
  reducer: { tasks: undoable(tasksSliceReducer) },
});

export type RootState = ReturnType<typeof store.getState>;
