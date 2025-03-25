import {addTodoListAC, getTodoListAC} from "./todoListReducer";
import {nanoid} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../../app/store";
import {
    APITask,
    TaskType,
    TaskPriorities,
    TasksState,
    TaskStatuses,
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
        case'CHANGE-TITLETASK': {
            return {
                ...state,
                // [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                //     action.payload.apiModel} : {...el})
            }
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
export const changeTaskTitleAC = (apiModel: UpdateDomainTaskModelType, taskId: string, todolistId: string) =>
    ({type: 'CHANGE-TITLETASK', payload: {apiModel, taskId, todolistId}} as const)
export const getTaskAC = (todolistId: string, items: any) =>
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
export const deleteTaskTC = (taskId:string, todolistId: string) => (dispatch: AppDispatch) => {
    APITask.deleteTask(taskId,todolistId).then(res => {
        dispatch(deleteTaskAC(taskId,todolistId))
    })
}

export const changeTaskTC = (domainModel: UpdateDomainTaskModelType,taskId:string,todolistId: string) => (dispatch: AppDispatch,getState:()=>RootState) => {
    const state=getState()
    const taskss = state.tasks[todolistId].find(el=>el.id===taskId)
    console.log(taskss)
    if(!taskss){
        console.warn("task not found in the state");
        return;
    }
    const apiModel: UpdateTaskModelType = {
        deadline: taskss.deadline,
        description: taskss.description,
        priority: taskss.priority,
        startDate: taskss.startDate,
        title: taskss.title,
        completed: taskss.completed,
        status: taskss.status,
        ...domainModel
    };
    APITask.changeTask(apiModel,taskId,todolistId).then(res => {
        dispatch(changeTaskTitleAC(apiModel,taskId,todolistId))
    })
}
//types
type ActionsType =
    ReturnType<typeof createTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof getTodoListAC>
    | ReturnType<typeof getTaskAC>

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities ;
    startDate?: string;
    deadline?: string;
};