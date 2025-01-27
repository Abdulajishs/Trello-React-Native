import axios from "axios"
import { createCheckList, setCheckLists, deleteCheckList, addCheckItemToCheckList, updateCheckList } from "./checkListSlice";
import { useSelector } from "react-redux";


let APIKey = process.env.API_KEY
let APIToken = process.env.TOKEN

export const fetchCheckList = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`https://api.trello.com/1/cards/${id}/checklists?key=${APIKey}&token=${APIToken}`);
        const data = response.data
        dispatch(setCheckLists(data))
    } catch (error) {
        console.log(`Error fetching checklists`, error)
    }
}

export const creatingChecklist = (id, body) => async (dispatch) => {
    try {
        let response = await axios.post(`https://api.trello.com/1/cards/${id}/checklists?key=${APIKey}&token=${APIToken}`, body);
        let data = response.data
        dispatch(createCheckList(data))
    } catch (error) {
        console.error(`Error to creating checklist, ${error}`)
    }
}

export const DeletingChecklist = (id, idChecklist) => async (dispatch) => {
    console.log(id, idChecklist)
    try {
        let response = await axios.delete(`https://api.trello.com/1/cards/${id}/checklists/${idChecklist}?key=${APIKey}&token=${APIToken}`);
        let data = response.data;
        // console.log(data)
        dispatch(deleteCheckList(idChecklist))
    } catch (error) {
        console.error(`Error to deleting checklist, ${error}`)
    }
}


export const addingCheckItemToChecklist = (id, name) => async (dispatch) => {
    try {
        let response = await axios.post(`https://api.trello.com/1/checklists/${id}/checkItems?name=${name}&key=${APIKey}&token=${APIToken}`);
        let data = response.data
        // console.log(data)
        dispatch(addCheckItemToCheckList({ id, data }))
    } catch (error) {
        console.error(`Error to creating checkitem, ${error}`)
    }
}


export const updatingCheckList = (idCard, idCheckItem, status, checklistId, updated) => async (dispatch) => {
    try {
        let response = await axios.put(`https://api.trello.com/1/cards/${idCard}/checkItem/${idCheckItem}?key=${APIKey}&token=${APIToken}&state=${status}`);
        let data = response.data;
        // console.log(data)
        dispatch(updateCheckList({ checklistId, updated }))
    } catch (error) {
        console.error(`Error to update list, ${error}`)
    }
}