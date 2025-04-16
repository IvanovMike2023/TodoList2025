import {createAction, createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../../app/store";
import {APITodoList, TodolistsType} from "../../features/todolists/api/APITodoList";
import {getTaskTC} from "./task-slice";

const initialState: DomainTodoType[]  = []
export const todolistsSlice=createSlice({
    name: 'todolist',
    initialState: initialState ,
    reducers: (creatore)=>({
        getTodoListAC: creatore.reducer< TodolistsType[]>((state,action)=>{
         return   action.payload.map(tl => ({...tl,filter: 'all'}))
        }),
        addTodoListAC: creatore.reducer<{todoList: TodolistsType}>((state,action)=>{
           state= [{...action.payload.todoList,filter:'all'}, ...state]
        }),
        deleteTodoListAC: creatore.reducer<any>((state,action)=>{
          state.filter(fl => fl.id !== action.payload.todolistId)
        }),
        changeTitleTodoListAC: creatore.reducer<{title: string, todolistId: string}>((state,action)=>{
            state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : {...el})
        }),
        changeFilterTodoListAC: creatore.reducer<{filter: FilterValuesType, todolistId: string}>((state,action)=>{
            state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : {...el})        })
    })
})

export const todolistsReducer = todolistsSlice.reducer
export const {getTodoListAC,addTodoListAC, deleteTodoListAC, changeTitleTodoListAC,changeFilterTodoListAC} = todolistsSlice.actions

//
// export const todolistsReducer = (state: DomainTodoType[] = initialState, action: ActionsType): DomainTodoType[] => {
//     switch (action.type) {
//         case 'ADD-TODOLIST':
//             return [{...action.payload,filter:'all'}, ...state]
//         case'GET-TODOLIST':
//             return action.payload.map(tl => ({...tl,filter: 'all'}))
//         case'REMOVE-TODOLIST':
//             return state.filter(fl => fl.id !== action.payload.todolistId)
//         case'CHANGE-TITLE':
//             return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : {...el})
//         case'CHANGE-FILTER':
//             return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : {...el})
//         default:
//             return state;
//     }
// }
// //actions
//
// export const getTodoListAC = createAction('GET-TODOLIST', (todolists: TodolistsType[]) => {
//     return {payload: todolists}
// })
// export const addTodoListAC = createAction('ADD-TODOLIST', (todoList: TodolistsType) => {
//     return {payload: todoList}
// })
// export const deleteTodoListAC = createAction('REMOVE-TODOLIST', (todolistId: string) => {
//     return {payload: {todolistId}}
// })
//
// export const changeTitleTodoListAC = createAction('CHANGE-TITLE', (title: string, todolistId: string) => {
//     return {payload: {title: title, todolistId: todolistId}}
// })
// export const changeFilterTodoListAC = createAction('CHANGE-FILTER', (filter: FilterValuesType, todolistId: string) => {
//     return {payload: {filter, todolistId}}
// })

//thuks
export const fetchTodolistsTC = () =>
    (dispatch: AppDispatch) => {
        APITodoList.getTodoList().then((res) => {
              dispatch(todolistsSlice.actions.getTodoListAC(res.data))
            res.data.forEach((el:TodolistsType)=> dispatch(getTaskTC(el.id,)))
        })
    }
export const deleteTodoListTC = (todoListId: string) => (dispatch: AppDispatch) => {
    APITodoList.deleteTodoList(todoListId).then(res => {
        dispatch(todolistsSlice.actions.deleteTodoListAC(todoListId))
    }).catch((e)=>{
        console.log(e)
    })
}
export const createTodoListTC = (title: string) => (dispatch: AppDispatch) => {
    APITodoList.createnNewTodoList(title).then(res => {
        dispatch(todolistsSlice.actions.addTodoListAC(res.data.data.item))
    })
}
export const changeTodoListTC = (title: string, todolistId: string) => (dispatch: AppDispatch) => {
    APITodoList.changeTodoList(title,todolistId).then(res=>dispatch(todolistsSlice.actions.changeTitleTodoListAC({
        title,
        todolistId
    })))
}
//types
// type ActionsType =
//     ReturnType<typeof addTodoListAC>
//     | ReturnType<typeof deleteTodoListAC>
//     | ReturnType<typeof changeTitleTodoListAC>
//     | ReturnType<typeof getTodoListAC>
//     | ReturnType<typeof changeFilterTodoListAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type DomainTodoType= TodolistsType & {filter:FilterValuesType}