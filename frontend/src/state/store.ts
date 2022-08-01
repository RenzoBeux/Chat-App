import { configureStore } from '@reduxjs/toolkit';
import { dataSlice } from './slices/dataSlice.ts';
// ...

const store = configureStore({
  reducer: {
    // settings: settingsReducer,
    data: dataSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
