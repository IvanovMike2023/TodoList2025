import {tasksReducer} from "../common/components/task-slice";
import {todolistsReducer} from "../common/components/todoList-slice";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer, appSlice} from "./app-slice";
import {authReducer, authSlice} from "../features/todolists/ui/Login/auth-slice";
import {_APITodoList, APITodoList} from "@/features/todolists/api/APITodoList";
import {setupListeners} from "@reduxjs/toolkit/query";
// создание store
export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        [appSlice.name]: appReducer,
        [authSlice.name]: authReducer,
    }
})
setupListeners(store.dispatch)
// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore

window.store = store