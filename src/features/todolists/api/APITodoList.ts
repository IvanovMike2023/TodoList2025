import {DomainTodolist} from "@/common/components/todoList-slice";
import {baseApi} from "@/app/baseApi";

export type LoginArgs = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}

export const APITodoList =baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTodolists: build.query<DomainTodolist[], void>({
            query: () => "todo-lists",
            transformResponse: (todolists: TodolistsType[]): DomainTodolist[] =>
                todolists.map((todolist) => ({...todolist, filter: "all", entityStatus: 'idle'})),
            providesTags: ['TodoList']
        }),
        createnNewTodoList: build.mutation<BaseResponse<{item:TodolistsType}>,string>({
            query: (title)=>({
                url:"/todo-lists",
                method:"POST",
                body:{title}
            }),
            invalidatesTags: ['TodoList']
        }) ,
        deleteTodoList: build.mutation<BaseResponse,string>({
            query: (todolistId)=>({
                url:`/todo-lists/${todolistId}`,
                method:"DELETE"
            }),
            invalidatesTags: ['TodoList']
        }),
        changeTodoList: build.mutation<BaseResponse, { title:string, todolistId:string }>({
            query: ({title, todolistId})=>({
                url:`/todo-lists/${todolistId}`,
                method:"PUT",
                body: {title}
            }),
            invalidatesTags: ['TodoList']
        })
    }),
})

export const {useGetTodolistsQuery,useLazyTodolistsQuery,useCreatenNewTodoListMutation,useDeleteTodoListMutation,useChangeTodoListMutation} = APITodoList

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
            query: () => "auth/me",
        }),
        login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
            query: (body) => ({
                url: "auth/login",
                method: "POST",
                body,
            }),
        }),
        logout: build.mutation<BaseResponse, void>({
            query: () => ({
                url: "auth/login",
                method: "DELETE",
            }),
        }),
    }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi

export const ApiTask = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTask: build.query<GetTasksResponse, void>({
            query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
            providesTags: ['Task'],
        }),
        createnNewTask: build.mutation<BaseResponse<{ item: TaskType }>,{ title: string, todolistId: string }>({
            query: ({todolistId,title}) => ({
                url: `/todo-lists/${todolistId}/tasks`,
                method: "POST",
                body: {title},
            }),
            invalidatesTags: ['Task']
        }),
        deleteTask: build.mutation<BaseResponse<{ item: TaskType }>,{ taskId: string, todolistId: string }>({
            query: ({todolistId,taskId}) => ({
                url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                method: "DELETE",

            }),
            invalidatesTags: ['Task']
        }),
        updateTask: build.mutation<BaseResponse<{ item: TaskType }>,{ model: UpdateTaskModelType, taskId: string, todolistId: string }>({
            query: ({todolistId,taskId,model}) => ({
                url: `/todo-lists/${todolistId}/tasks/${taskId}`,
                method: "PUT",
                body: model
            }),
            invalidatesTags: ['Task']
        }),
    }),
})

export const { useGetTaskQuery,useCreatenNewTaskMutation,useDeleteTaskMutation,useUpdateTaskMutation  } = ApiTask

///types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskModelType = {
    deadline: string | null
    description: any
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string;
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    completed: boolean
    addedDate: string
}
export type TasksState = {
    [key: string]: TaskType[]
}


export type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}
export type FieldError = {
    error: string
    field: string
}
export type BaseResponse<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}