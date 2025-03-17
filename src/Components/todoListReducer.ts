import {Task, TasksState, Todolist} from "../app/App";

const initialState:Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: ActionsType): Todolist[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
          return state
           // return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]};
        case'REMOVE-TODOLIST':
//            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].filter((el)=>el.id!=action.payload.taskId)}
  return state
            default:
            return state;
    }
}
//actions
export const addTodoListAC = (task: Task, todolistId: string) =>
    ({type: 'ADD-TODOLIST', payload: {task, todolistId}} as const)
export const removeTodoListAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {taskId, todolistId}} as const)
//types
type ActionsType =
    ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>