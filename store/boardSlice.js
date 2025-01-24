import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    boards: []
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoards: (state, action) => {
            // console.log(action.payload)
            state.boards = action.payload
        },
        createBoard: (state, action) => {
            state.boards.push(action.payload)
        },
        deleteBoard: (state, action) => {
            state.boards = state.boards.filter((board) => board.id != action.payload)
        }
    }
})

export const {
    setBoards,
    createBoard,
    deleteBoard
} = boardSlice.actions;

export default boardSlice.reducer;