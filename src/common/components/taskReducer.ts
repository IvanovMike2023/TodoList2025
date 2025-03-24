import {Task, TasksState} from "../../app/App";
import {createTodoListAC, getTodoListAC} from "./todoListReducer";
import {nanoid} from "@reduxjs/toolkit";

const initialState = {}

export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
    switch (action.type) {
        case 'ADD-TASK':
            const newtask = {id: nanoid(), title: action.payload.title, isdone: true}
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newtask]};
        case'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((el) => el.id != action.payload.taskId)
            }
        case'CHANGE-TITLETASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.title
                } : {...el})
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'GET-TODOLIST': {
            const copystate = {...state}
            action.payload.forEach(tl =>
                copystate[tl.id] = []
            )
            return copystate
        }
        default:
            return state;
    }
}
//actions
export const createTaskAC = (title: string, todolistId: string) =>
    ({type: 'ADD-TASK', payload: {title, todolistId}} as const)
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const)
export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string) =>
    ({type: 'CHANGE-TITLETASK', payload: {title, taskId, todolistId}} as const)
//types
type ActionsType =
    ReturnType<typeof createTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof createTodoListAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof getTodoListAC>