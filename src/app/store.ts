import {tasksReducer} from "../common/components/task-slice";
import {todolistsReducer} from "../common/components/todoList-slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./app-slice";
import {authReducer, authSlice} from "../features/todolists/ui/Login/auth-slice";
// создание store
export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        themeMode: appReducer,
        [authSlice.name]: authReducer
    },
})
// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore

window.store = store