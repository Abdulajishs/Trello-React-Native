import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkLists: []
}

const checkListSlice = createSlice({
    name: 'checklist',
    initialState,
    reducers: {
        setCheckLists: (state, action) => {
            // console.log(action.payload)
            state.checkLists = action.payload
        },
        createCheckList: (state, action) => {
            state.checkLists.push(action.payload)
        },
        deleteCheckList: (state, action) => {
            state.checkLists = state.checkLists.filter((checkList) => checkList.id != action.payload)
        },
        addCheckItemToCheckList(state, action) {
            const { id, data } = action.payload;
            const checkList = state.checkLists.find((cl) => cl.id === id);
            if (checkList) {
                checkList.checkItems.push(data);
            }
        },
        updateCheckList: (state, action) => {
            const { checklistId, updated } = action.payload;
            // console.log(updated)
            state.checkLists = state.checkLists.map((checklist) => checklist.id === checklistId ? { ...checklist, checkItems: updated } : checklist)
        }
    }
})

export const {
    setCheckLists,
    createCheckList,
    deleteCheckList,
    addCheckItemToCheckList,
    updateCheckList
} = checkListSlice.actions;

export default checkListSlice.reducer;