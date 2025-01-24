import axios from "axios"
import { setBoards, createBoard, deleteBoard } from "./boardSlice";

let APIKey = process.env.API_KEY
let APIToken = process.env.TOKEN
// console.log(token, apiKey)
export const fetchBoards = () => async (dispatch) => {
    try {
        let response = await axios.get(`https://api.trello.com/1/members/me/boards?key=${APIKey}&token=${APIToken}`);
        let data = response.data;
        // console.log(data)
        dispatch(setBoards(data))
    } catch (error) {
        console.error(`Error to fetch boards, ${error}`)
    }
}
export const creatingBoard = (name, body) => async (dispatch) => {
    try {
        let response = await axios.post(`https://api.trello.com/1/boards/?name=${name}&key=${APIKey}&token=${APIToken}`, body);
        let data = response.data;
        // console.log(data)
        dispatch(createBoard(data))
    } catch (error) {
        console.error(`Error to creating board, ${error}`)
    }
}

export const deletingBoard = (id) => async (dispatch) => {
    console.log(id)
    try {
        let response = await axios.delete(`https://api.trello.com/1/boards/${id}?key=${APIKey}&token=${APIToken}`);
        let data = response.data;
        // console.log(data)
        dispatch(deleteBoard(id))
    } catch (error) {
        console.error(`Error to deleting board, ${error}`)
    }
}