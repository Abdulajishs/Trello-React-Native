import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './boardSlice'
import listReducer from './listSlice'
import cardReducer from './cardSlice'

const store = configureStore({
    reducer: {
        boards: boardReducer,
        lists: listReducer,
        cards: cardReducer
    }
})

export default store;