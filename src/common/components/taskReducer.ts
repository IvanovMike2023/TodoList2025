import {Task, TasksState} from "../../app/App";
import {v1} from "uuid";
import {addTodoListAC, todoListId1, todoListId2} from "./todoListReducer";

const initialState = {
    // [todoListId1]:[
    //     {id: v1(), title: 'xsax', isdone: true},
    //     {id: v1(), title: '33333', isdone: true},
    //     {id: v1(), title: '3333', isdone: true},
    //     {id: v1(), title: '55555', isdone: true}
    // ],   [todoListId2]:[
    //     {id: v1(), title: '22222', isdone: true},
    //     {id: v1(), title: '2222', isdone: true}
    // ]
}

export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {

    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]};
        case'REMOVE-TASK':
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].filter((el)=>el.id!=action.payload.taskId)}
        // case'CHANGE-TITLE':
        //     return {...state,[action.payload.todolistId]:[{id: v1(), title: '2222', isdone: true}]}
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
            default:
            return state;
    }
}
//actions
export const addTaskAC = (task: Task, todolistId: string) =>
    ({type: 'ADD-TASK', payload: {task, todolistId}} as const)
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const)
export const changeTitleTodoListAC1 = (title: string, todolistId: string) =>
    ({type: 'CHANGE-TITLE', payload: {title, todolistId}} as const)
//types
type ActionsType =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTitleTodoListAC1>