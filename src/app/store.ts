import {tasksReducer} from "../common/components/task-slice";
import {todolistsReducer} from "../common/components/todoList-slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appReduser} from "./app-slice";
import {loginReducer} from "../features/todolists/ui/Login/loginReducer";
// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    themeMode:appReduser,
    me:loginReducer
})

// создание store
export const store = configureStore({


    reducer: rootReducer,
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store