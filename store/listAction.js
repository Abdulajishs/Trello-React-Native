import axios from "axios"
import { createList, deleteList, setLists, updateList } from "./listSlice";

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

export const creatingList = (boardId, name) => async (dispatch) => {
    try {
        let response = await axios.post(`https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${APIKey}&token=${APIToken}`);
        let data = response.data;
        // console.log(data)
        dispatch(createList(data))
    } catch (error) {
        console.error(`Error to create list, ${error}`)
    }
}

export const updatingList = (id, updatedList) => async (dispatch) => {
    try {
        let response = await axios.put(`https://api.trello.com/1/lists/${id}?key=${APIKey}&token=${APIToken}`, updatedList);
        let data = response.data;
        // console.log(data)
        dispatch(updateList(data))
    } catch (error) {
        console.error(`Error to update list, ${error}`)
    }
}

export const ArchivingList = (id) => async (dispatch) => {
    console.log(id)
    try {
        let response = await axios.put(`https://api.trello.com/1/lists/${id}/closed?key=${APIKey}&token=${APIToken}&value=true`);
        let data = response.data;
        console.log(data)
        dispatch(deleteList(id))
    } catch (error) {
        console.error(`Error to archive list, ${error}`)
    }
}
