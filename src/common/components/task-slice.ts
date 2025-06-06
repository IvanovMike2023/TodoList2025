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
import {createAppSlice} from "../utils/createAppSlice";
export const tasksSlice=createAppSlice({
    name: 'tasks',
    initialState: {} as TasksState ,
    reducers: (creatore)=>({
        createTaskAC: creatore.reducer<{task: TaskType}>((state,action)=>{
            const newtask = state[action.payload.task?.todoListId]
            if(newtask)
            newtask.unshift(action.payload.task) }),
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
     state[action.payload?.todoList?.id] = []
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
        dispatch(getTaskTC(todolistId))
    })
}
export const getTaskTC = (todolistId: string) => (dispatch: AppDispatch) => {
    APITask.getTodoList(todolistId).then(res => {
        dispatch(tasksSlice.actions.getTaskAC({items:res.data.items, todolistId:todolistId}))
    })
}
export const deleteTaskTC = (taskId: string, todolistId: string) => (dispatch: AppDispatch) => {
    APITask.deleteTask(taskId, todolistId).then(res => {
        dispatch(deleteTaskAC({taskId, todolistId}))
        dispatch(getTaskTC(todolistId))
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
            dispatch(getTaskTC(todolistId))
        } else console.log('sssss')

    })
}

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};