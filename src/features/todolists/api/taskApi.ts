import { GetTasksResponse, TaskType, UpdateTaskModelType} from "@/features/todolists/api/taskApi.types";
import {baseApi} from "../../../app/baseApi";
import {BaseResponse} from "@/features/todolists/api/todoListApi.types";

export const ApiTask = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTask: build.query<GetTasksResponse, void>({
            query: ({todolistId, count, page}) =>
                `/todo-lists/${todolistId}/tasks?page=${page}&count=${count}`,
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
