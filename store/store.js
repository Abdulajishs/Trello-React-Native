import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './boardSlice'
import listReducer from './listSlice'
import cardReducer from './cardSlice'
import checkListReducer from './checkListSlice'

const store = configureStore({
    reducer: {
        boards: boardReducer,
        lists: listReducer,
        cards: cardReducer,
        checkLists: checkListReducer
    }
})

export default store;