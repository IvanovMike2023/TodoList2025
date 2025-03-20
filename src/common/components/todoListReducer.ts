import {TodolistType} from "../../app/App";
import {createAction, nanoid} from "@reduxjs/toolkit";
import {TodolistsType} from "./Login/AppTttpRequest";

const initialState: TodolistsType[] = [
    // {id: todoListId1, title: 'cass', filter: 'all'},
    // {id: todoListId2, title: 'cascasc', filter: 'all'},

]

export const todolistsReducer = (state: TodolistsType[] = initialState, action: ActionsType): TodolistsType[] => {
//debugger
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{
                id: action.payload.todolistId,
                title: action.payload.title,
                addDate: 'string', order: 20
            }, ...state]
        case'GET-TODOLIST':
            return action.payload//action.payload
        case'REMOVE-TODOLIST':
            return state.filter(fl=>fl.id!=action.payload.todolistId)
        case'CHANGE-TITLE':
            return state.map(el=>el.id===action.payload.todolistId ? {...el,title:action.payload.title}:{...el})
        default:
            return state;
    }
}
//actions

export const getTodoListAC=createAction('GET-TODOLIST',(todolists:TodolistsType[])=>{
    return {payload: todolists}
})
export const createTodoListAC=createAction('ADD-TODOLIST',(title:string)=>{
    return {payload: {title:title,todolistId: nanoid()}}
})
export const deleteTodoListAC = createAction('REMOVE-TODOLIST',( todolistId: string)=>{
    return {payload: {todolistId}}
})
export const removeTodoListAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {taskId, todolistId}} as const)
export const changeTitleTodoListAC=createAction('CHANGE-TITLE',(title: string, todolistId: string)=>{
      return {payload:{title:title, todolistId: todolistId}}
  })
//types
type ActionsType =
    ReturnType<typeof createTodoListAC>
    | ReturnType<typeof deleteTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | ReturnType<typeof getTodoListAC>