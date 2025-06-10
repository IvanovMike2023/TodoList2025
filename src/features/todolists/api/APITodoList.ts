import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

import {instance} from "./instance";
import {AUTH_TOKEN} from "@/common/constants";
import {DomainTodolist} from "@/common/components/todoList-slice";

export type LoginArgs = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}


export const APITodoList = createApi({
    tagTypes: ['TodoLists'],
    reducerPath: 'APITodoList',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set("API-KEY", import.meta.env.VITE_API_KEY)
            headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
        },
    }),
    endpoints: (build) => ({
        getTodolists: build.query<DomainTodolist[], void>({
            query: () => "todo-lists",
            transformResponse: (todolists: TodolistsType[]): DomainTodolist[] =>
                todolists.map((todolist) => ({...todolist, filter: "all", entityStatus: 'idle'})),
            providesTags: ['TodoLists']

        }),
        createnNewTodoList: build.mutation<BaseResponse<{item:TodolistsType}>,string>({
            query: (title)=>({
                url:"/todo-lists",
                method:"POST",
                body:{title}
            }),
            invalidatesTags: ['TodoLists']
        }) ,
        deleteTodoList: build.mutation<BaseResponse,string>({
            query: (todolistId)=>({
                url:`/todo-lists/${todolistId}`,
                method:"DELETE"
            }),
            invalidatesTags: ['TodoLists']
        }),
        changeTodoList: build.mutation<BaseResponse, { title:string, todolistId:string }>({
            query: ({title, todolistId})=>({
                url:`/todo-lists/${todolistId}`,
                method:"PUT",
                body: {title}
            }),
            invalidatesTags: ['TodoLists']
        })
    }),
})

// me() {
//     const promise = instance.get<BaseResponse<meResponse>>(`/auth/me`)
//     return promise
// }
// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {useGetTodolistsQuery,useLazyTodolistsQuery,useCreatenNewTodoListMutation,useDeleteTodoListMutation,useChangeTodoListMutation} = APITodoList

export const _APITodoList = {
    auth(payload: LoginArgs) {
        const promise = instance.post<BaseResponse<{ userId: number, token: string }>>(`/auth/login`, payload)
        return promise
    },
    logout() {
        const promise = instance.delete<BaseResponse>(`/auth/login`)
        return promise
    },
    getTodoList() {
        const promise = instance.get<GetTodoListResponse[]>(`/todo-lists`)
        return promise
    },
    deleteTodoList(todolistId: string) {
        const promise = instance.delete(`/todo-lists/${todolistId}`)
        return promise
    },
    createnNewTodoList(title: string) {
        const promise = instance.post(`/todo-lists`, {title: title})
        return promise
    },
    changeTodoList(title: string, todolistId: string) {
        const promise = instance.put(`/todo-lists/${todolistId}`, {title: title})
        return promise
    },
    me() {
        const promise = instance.get<BaseResponse<meResponse>>(`/auth/me`)
        return promise
    }
}

export const APITask = {
    auth(payload: LoginArgs) {
        const promise = instance.post<BaseResponse<{ userId: number, token: string }>>(`/auth/login`, payload)
        return promise
    },
    me() {
        const promise = instance.get<BaseResponse<meResponse>>(`/auth/me`)
        return promise
    },
    getTask(todolistId: string) {
        const promise = instance.get(`/todo-lists/${todolistId}/tasks`)
        return promise
    },
    createnNewTask(payload: { title: string, todolistId: string }) {
        const {todolistId, title} = payload
        console.log(payload)
        const promise = instance.post<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    deleteTask(taskId: string, todolistId: string) {
        console.log(todolistId)
        const promise = instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    changeTask(payload: { apiModel: UpdateTaskModelType, taskId: string, todolistId: string }) {
        const {apiModel, taskId, todolistId} = payload
        const promise = instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, apiModel)
        return promise
    }
}

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
export type ResponseType<D = {}> = {
    resultCode: number;
    messages: Array<string>
    data: D
}
type GetTodoListResponse = {
    id: string
    addedDate: string
    order: number
    title: string
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
type meResponse = {
    id: number
    email: string
    login: string
}
export type BaseResponse<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}