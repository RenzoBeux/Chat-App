import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface DataState {
  step: number;
  username: string;
  room: string|null;
}

// Define the initial state using that type
const initialState: DataState = {
  step: 0,
  username: '',
  room: null,
} as DataState;

const reducer = {
  setStep: (state: DataState, action: PayloadAction<number>) => {
    state.step = action.payload;
  },
  setUsername: (state: DataState, action: PayloadAction<string>) => {
    state.username = action.payload;
  },
  setRoom: (state: DataState, action: PayloadAction<string>) => {
    state.room = action.payload;
  }
};
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: reducer,
});

// Action creators are generated for each case reducer function
export const { setStep, setUsername, setRoom } = dataSlice.actions;

export default dataSlice.reducer;
