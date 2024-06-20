import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matches: [],
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatches(state, action) {
      state.matches = action.payload.slice(0, 2);
    },
  },
});

export const { setMatches } = matchSlice.actions;

export default matchSlice.reducer;