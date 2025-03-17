import {Task, TasksState, Todolist} from "../app/App";
import {v1} from "uuid";
export const todoListId1=v1()
export const todoListId2=v1()
const initialState: Todolist[] = [
    // {id: todoListId1, title: 'cass', filter: 'all'},
    // {id: todoListId2, title: 'cascasc', filter: 'all'},

]

export const todolistsReducer = (state: Todolist[] = initialState, action: ActionsType): Todolist[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
        {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        // return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]};
        case'REMOVE-TODOLIST':
//            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].filter((el)=>el.id!=action.payload.taskId)}
            return state
        default:
            return state;
    }
}
//actions
export const addTodoListAC = (title:string) =>
    ({type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const)
export const removeTodoListAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {taskId, todolistId}} as const)
//types
type ActionsType =
    ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>