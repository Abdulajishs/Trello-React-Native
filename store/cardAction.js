import axios from "axios"
import { setCards } from "./cardSlice";

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
        console.error(`Error to fetch lists, ${error}`)
    }
}