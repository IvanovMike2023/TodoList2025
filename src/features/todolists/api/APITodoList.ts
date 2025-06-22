import {DomainTodolist} from "@/common/components/todoList-slice";
import {baseApi} from "@/app/baseApi";
import {BaseResponse, TodolistsType} from "@/features/todolists/api/todoListApi.types";

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



