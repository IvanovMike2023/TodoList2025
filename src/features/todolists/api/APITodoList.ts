import axios from "axios";

const token = "ef7ff5dd-c4a1-4818-a09c-d1c24bd17361"
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "Authorization": `Bearer ${token}`,
        "API-KEY": "a2bc24bd-0a71-4fa5-ad1c-5b343082cdb6"
    }
});
export const APITodoList = {
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
    }
}

export const APITask = {
    getTodoList(todolistId: string) {
        const promise = instance.get(`/todo-lists/${todolistId}/tasks`)
        return promise
    },
    createnNewTask(title: string, todolistId: string) {
        const promise = instance.post(`/todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    deleteTask(taskId: string, todolistId: string) {
        const promise = instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    changeTask(model: UpdateTaskModelType, taskId: string, todolistId: string) {
        const promise = instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
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
    deadline: string;
    description: any;
    priority: TaskPriorities;
    startDate: string;
    status: TaskStatuses;
    title: string;
};

export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    completed: boolean;
    addedDate: string;
}
export type TasksState = {
    [key: string]: TaskType[]
}
export type ResponseType<D = {}> = {
    resultCode: number;
    messages: Array<string>;
    data: D;
}
type GetTodoListResponse = {
    id: string
    addedDate: string
    order: number
    title: string
}
type DeleteTodoListResponse = {
    resultCode: number
    messages: string
    data: {}
    fieldsErrors: []
}
