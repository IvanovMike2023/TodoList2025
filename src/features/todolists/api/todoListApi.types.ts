

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
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
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export type FilterValuesType = 'all' | 'active' | 'completed';
export type DomainTodolist = TodolistsType & { filter: FilterValuesType
    entityStatus: RequestStatus }