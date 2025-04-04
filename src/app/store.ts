import {tasksReducer} from "../common/components/taskReducer";
import {todolistsReducer} from "../common/components/todoListReducer";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {counterReducer} from "../common/components/themeReducer";
import {loginReducer} from "../features/todolists/ui/Login/loginReducer";
// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    themeMode:counterReducer,
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