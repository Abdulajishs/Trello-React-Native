import axios from "axios"
import { setLists } from "./listSlice";

let APIKey = process.env.API_KEY
let APIToken = process.env.TOKEN
// console.log(token, apiKey)
export const fetchLists = (boardId) => async (dispatch) => {
    try {
        let response = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${APIKey}&token=${APIToken}`);
        let data = response.data;
        // console.log(data)
        dispatch(setLists(data))
    } catch (error) {
        console.error(`Error to fetch lists, ${error}`)
    }
}
