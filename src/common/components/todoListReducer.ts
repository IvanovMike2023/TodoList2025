import {TodolistType} from "../../app/App";
import {v1} from "uuid";
import {createAction} from "@reduxjs/toolkit";

const initialState: TodolistType[] = [
    // {id: todoListId1, title: 'cass', filter: 'all'},
    // {id: todoListId2, title: 'cascasc', filter: 'all'},

]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {

    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            }, ...state]
        case'REMOVE-TODOLIST':
            return state
        case'CHANGE-TITLE':
            return state.map(el=>el.id===action.payload.todolistId ? {...el,title:action.payload.title}:{...el})
        default:
            return state;
    }
}
//actions
//export const addTodoListAC = (title:string) =>
   // ({type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const)
export const createTodoListAC=createAction('ADD-TODOLIST',(title:string)=>{
    return {payload: {title:title,todolistId: v1()}}
})
export const deleteTodoListAC = createAction('REMOVE-TODOLIST',(taskId: string, todolistId: string)=>{
    return {payload: {taskId,todolistId}}
})
export const removeTodoListAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {taskId, todolistId}} as const)
export const changeTitleTodoListAC = (title: string, todolistId: string) =>
    ({type: 'CHANGE-TITLE', payload: {title, todolistId}} as const)
//types
type ActionsType =
    ReturnType<typeof createTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>