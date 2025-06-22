import {TaskStatus} from "@/common/enums";
import {TaskPriorities} from "@/features/todolists/api/todoListApi.types";


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
    status: TaskStatus
    title: string;
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatus
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


