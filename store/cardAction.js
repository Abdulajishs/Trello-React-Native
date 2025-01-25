import axios from "axios"
import { createCard, deleteCard, setCards } from "./cardSlice";

let APIKey = process.env.API_KEY
let APIToken = process.env.TOKEN
// console.log(token, apiKey)
export const fetchCards = (boardId) => async (dispatch) => {
    try {
        let response = await axios.get(`https://api.trello.com/1/boards/${boardId}/cards?key=${APIKey}&token=${APIToken}`);
        let data = response.data;
        // console.log(data)
        dispatch(setCards(data))
    } catch (error) {
        console.error(`Error to fetch cards, ${error}`)
    }
}

export const creatingCard = (listId, body) => async (dispatch) => {
    // console.log(listId)
    try {
        let response = await axios.post(`https://api.trello.com/1/cards?idList=${listId}&key=${APIKey}&token=${APIToken}`, body);
        let data = response.data
        // console.log('card created', data)
        dispatch(createCard(data))
    } catch (error) {
        console.error(`Error to creating card, ${error}`)
    }
}

export const DeletingCard = (id) => async (dispatch) => {
    console.log(id)
    try {
        let response = await axios.put(`https://api.trello.com/1/cards/${id}?key=${APIKey}&token=${APIToken}`);
        let data = response.data;
        // console.log(data)
        dispatch(deleteCard(id))
    } catch (error) {
        console.error(`Error to archive list, ${error}`)
    }
}