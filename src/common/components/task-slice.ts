import {addTodoListAC, FilterValuesType, getTodoListAC, todolistsSlice} from "./todoList-slice";
import {AppDispatch, RootState} from "../../app/store";
import {
    APITask,
    TaskPriorities,
    TasksState,
    TaskStatuses,
    TaskType, TodolistsType,
    UpdateTaskModelType
} from "../../features/todolists/api/APITodoList";
import {createSlice} from "@reduxjs/toolkit";
export const tasksSlice=createSlice({
    name: 'tasks',
    initialState: {} as TasksState ,
    reducers: (creatore)=>({
        createTaskAC: creatore.reducer<{task: TaskType}>((state,action)=>{
            const newtask = state[action.payload.task.todoListId]
            newtask.unshift(action.payload.task)        }),
        getTaskAC: creatore.reducer<{ items: TaskType[],todolistId: string}>((state,action)=>{
             state[action.payload.todolistId]=action.payload.items       }),
        deleteTaskAC: creatore.reducer<{taskId: string, todolistId: string}>((state,action)=>{
            const CurrentForTodoList=state[action.payload.todolistId]
            const index=CurrentForTodoList.findIndex((todo)=>todo.id===action.payload.taskId)
            if(index===-1) CurrentForTodoList.splice(index)
        }),
        updateTaskAC: creatore.reducer<{apiModel: UpdateDomainTaskModelType, taskId: string, todolistId: string}>((state,action)=>{
           const newstate=state[action.payload.todolistId]
            newstate.map(el=>el.id===action.payload.taskId ? {...el,...action.payload.apiModel}:{el})
        }),
        updateStatusAC: creatore.reducer<{status:number, taskId: string, todolistId: string}>((state,action)=>{
           const newstate=state[action.payload.todolistId]
            newstate.map(el=>el.id===action.payload.taskId ? {...el,status:action.payload.status}:{el})
        })
}),
    extraReducers:(builder)=>{
builder.addCase(todolistsSlice.actions.addTodoListAC,(state,action)=>{
     state[action.payload?.todoList.id] = []
});
    builder.addCase(todolistsSlice.actions.getTodoListAC,(state,action)=>{
    action.payload.forEach((el)=>{
        state[el.id]=[]
    })
})
    }
})

export const tasksReducer = tasksSlice.reducer
export const {createTaskAC,getTaskAC, deleteTaskAC, updateTaskAC} = tasksSlice.actions
export const createTaskTC = (title: string, todolistId: string) => (dispatch: AppDispatch) => {
    APITask.createnNewTask(title, todolistId).then(res => {
        dispatch(tasksSlice.actions.createTaskAC(res.data.data.item))
    })
}
export const getTaskTC = (todolistId: string) => (dispatch: AppDispatch) => {
    APITask.getTodoList(todolistId).then(res => {
        dispatch(tasksSlice.actions.getTaskAC({items:res.data.items, todolistId:todolistId}))
    })
}
export const deleteTaskTC = (taskId: string, todolistId: string) => (dispatch: AppDispatch) => {
    APITask.deleteTask(taskId, todolistId).then(res => {
        dispatch(tasksSlice.actions.deleteTaskAC({taskId, todolistId}))
    })
}
export const setStatusTaskTC = (status:number,taskId: string, todolistId: string) => (dispatch: AppDispatch) => {
    APITask.setStatusTask(taskId, todolistId).then(res => {
        console.log(res)
        dispatch(tasksSlice.actions.updateStatusAC({status, taskId, todolistId}))
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
            dispatch(tasksSlice.actions.updateTaskAC({apiModel:domainModel, taskId:taskId, todolistId:todolistId}))
        } else console.log('sssss')

    })
}
//
//
//
//
//
// export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
//     switch (action.type) {
//         case 'ADD-TASK':
//             const newtask = action.payload.task
//             return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newtask]};
//         case 'GET-TASK':
//             return {...state, [action.payload.todolistId]: [...action.payload.items]}
//         case'DELETE-TASK':
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].filter((el) => el.id != action.payload.taskId)
//             }
//         case'CHANGE-TITLETASK':
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, ...action.payload.apiModel} : el)
//             }
//
//         case 'ADD-TODOLIST': {
//             return {
//                 ...state,
//                 [action.payload.todoList.id]: []
//             }
//         }
//         case 'GET-TODOLIST': {
//             const copystate = {...state}
//             action.payload.forEach(tl =>
//                 copystate[tl.id] = []
//             )
//             return copystate
//         }
//         default:
//             return state;
//     }
// }
// //actions
// export const createTaskAC = (task: TaskType, todolistId: string) =>
//     ({type: 'ADD-TASK', payload: {task, todolistId}} as const)
// export const deleteTaskAC = (taskId: string, todolistId: string) =>
//     ({type: 'DELETE-TASK', payload: {taskId, todolistId}} as const)
// export const updateTaskAC = (apiModel: UpdateDomainTaskModelType, taskId: string, todolistId: string) =>
//     ({type: 'CHANGE-TITLETASK', payload: {apiModel, taskId, todolistId}} as const)
// export const getTaskAC = (todolistId: string, items: TaskType[]) =>
//     ({type: 'GET-TASK', payload: {todolistId, items}} as const)

//thunk

//types
// type ActionsType =
//     ReturnType<typeof createTaskAC>
//     | ReturnType<typeof deleteTaskAC>
//     | ReturnType<typeof addTodoListAC>
//     | ReturnType<typeof updateTaskAC>
//     | ReturnType<typeof getTodoListAC>
//     | ReturnType<typeof getTaskAC>

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};