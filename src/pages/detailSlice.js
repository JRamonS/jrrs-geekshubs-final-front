import { createSlice } from '@reduxjs/toolkit';

export const detailSlice = createSlice({
    name: 'detail',
    initialState: {
      choosenObject: {}
    },
    reducers: {
      addChoosen: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

//I export the ACTIONS.....
export const { addChoosen } = detailSlice.actions;

export const detailData = (state) => state.detail;

export default detailSlice.reducer;