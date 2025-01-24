import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cards: []
}

const cardSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setCards: (state, action) => {
            // console.log(action.payload)
            state.cards = action.payload
        },
        createCard: (state, action) => {
            state.cards.push(action.payload)
        },
        deleteCard: (state, action) => {
            state.cards = state.cards.filter((card) => card.id != action.payload)
        }
    }
})

export const {
    setCards,
    createCard,
    deleteCard
} = cardSlice.actions;

export default cardSlice.reducer;