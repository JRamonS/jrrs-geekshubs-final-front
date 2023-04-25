import { createSlice } from '@reduxjs/toolkit';

export const petSlice = createSlice({
    name: 'pet',
    initialState: {
      choosenPet: {}
    },
    reducers: {
      addChoosenPet: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

//I export the ACTIONS.....
export const { addChoosenPet } = petSlice.actions;

export const petData = (state) => state.pet;

export default petSlice.reducer;