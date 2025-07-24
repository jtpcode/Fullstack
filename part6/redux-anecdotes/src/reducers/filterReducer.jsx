import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      console.log('Filter state: ', state)
      console.log('Filter action', action)

      return action.payload
    }
  }
})

export const  { filterChange } = filterSlice.actions
export default filterSlice.reducer
