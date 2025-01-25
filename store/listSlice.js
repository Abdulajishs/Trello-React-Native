import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lists: []
}

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setLists: (state, action) => {
            // console.log(action.payload)
            state.lists = action.payload
        },
        createList: (state, action) => {
            state.lists.push(action.payload)
        },
        updateList: (state, action) => {
            state.lists = state.lists.map((list) => list.id === action.payload.id ? action.payload : list)
        },
        deleteList: (state, action) => {
            state.lists = state.lists.filter((list) => list.id != action.payload)
        }
    }
})

export const {
    setLists,
    createList,
    updateList,
    deleteList
} = listSlice.actions;

export default listSlice.reducer;