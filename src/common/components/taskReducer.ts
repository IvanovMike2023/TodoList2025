import {addTodoListAC, getTodoListAC} from "./todoListReducer";
import {AppDispatch, RootState} from "../../app/store";
import {
    APITask,
    TaskPriorities,
    TasksState,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType
} from "../../features/todolists/api/APITodoList";

const initialState = {} as TasksState
export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
    switch (action.type) {
        case 'ADD-TASK':
            const newtask = action.payload.task
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newtask]};
        case 'GET-TASK':
            return {...state, [action.payload.todolistId]: [...action.payload.items]}
        case'DELETE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((el) => el.id != action.payload.taskId)
            }
        case'CHANGE-TITLETASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, ...action.payload.apiModel} : el)
            }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.id]: []
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
export const createTaskAC = (task: TaskType, todolistId: string) =>
    ({type: 'ADD-TASK', payload: {task, todolistId}} as const)
export const deleteTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'DELETE-TASK', payload: {taskId, todolistId}} as const)
export const updateTaskAC = (apiModel: UpdateDomainTaskModelType, taskId: string, todolistId: string) =>
    ({type: 'CHANGE-TITLETASK', payload: {apiModel, taskId, todolistId}} as const)
export const getTaskAC = (todolistId: string, items: TaskType[]) =>
    ({type: 'GET-TASK', payload: {todolistId, items}} as const)

//thunk
export const createTaskTC = (title: string, todolistId: string) => (dispanch: AppDispatch) => {
    APITask.createnNewTask(title, todolistId).then(res => {
        dispanch(createTaskAC(res.data.data.item, todolistId))
    })
}
export const getTaskTC = (todolistId: string) => (dispatch: AppDispatch) => {
    APITask.getTodoList(todolistId).then(res => {
        dispatch(getTaskAC(todolistId, res.data.items))
    })
}
export const deleteTaskTC = (taskId: string, todolistId: string) => (dispatch: AppDispatch) => {
    APITask.deleteTask(taskId, todolistId).then(res => {
        dispatch(deleteTaskAC(taskId, todolistId))
    })
}
export const setStatusTaskTC = (status:number,taskId: string, todolistId: string) => (dispatch: AppDispatch) => {
    APITask.setStatusTask(taskId, todolistId).then(res => {
        console.log(res)
        dispatch(deleteTaskAC(taskId, todolistId))
    })
}

export const updateTaskTC = (domainModel: UpdateDomainTaskModelType, taskId: string, todolistId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState()
    const task = state.tasks[todolistId].find(el => el.id === taskId)
    if (!task) {
        console.warn("task not found in the state");
        return;
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    };
    APITask.changeTask(apiModel, taskId, todolistId).then(res => {
        if (res.data.messages.length === 0) {
            dispatch(updateTaskAC(domainModel, taskId, todolistId))
        } else console.log('sssss')

    })
}
//types
type ActionsType =
    ReturnType<typeof createTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof getTodoListAC>
    | ReturnType<typeof getTaskAC>

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};