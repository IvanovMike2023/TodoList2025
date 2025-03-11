import {Task, TasksState} from "../App";

const initialState = {}

export const Taskreducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]};
        case'REMOVE-TASK':
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].filter((el)=>el.id!=action.payload.taskId)}
            default:
            return state;
    }
}
//actions
export const addTaskAC = (task: Task, todolistId: string) =>
    ({type: 'ADD-TASK', payload: {task, todolistId}} as const)
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const)
//types
type ActionsType =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>