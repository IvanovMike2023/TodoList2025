import {AppDispatch} from "../../app/store";
import {APITodoList, TodolistsType} from "../../features/todolists/api/APITodoList";
import {getTaskTC} from "./task-slice";
import {createAppSlice} from "../utils/createAppSlice";

const initialState: DomainTodolist[] = []
export const todolistsSlice = createAppSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: (creatore) => ({
        getTodoListAC: creatore.reducer<TodolistsType[]>((state, action) => {
            return action.payload.map(tl => ({...tl, filter: 'all'}))
        }),
        addTodoListAC: creatore.reducer<{ todoList: TodolistsType }>((state, action) => {
            debugger
            return [...state]
        }),
        deleteTodoListAC: creatore.reducer<string>((state, action) => {
            state.filter(fl => fl.id !== action.payload)
        }),
        changeTitleTodoListAC: creatore.reducer<{ title: string, todolistId: string }>((state, action) => {
           return  state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : {...el})
        }),
        changeFilterTodoListAC: creatore.reducer<{ filter: FilterValuesType, todolistId: string }>((state, action) => {
           return  state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : {...el})
        })
    })
})

export const todolistsReducer = todolistsSlice.reducer
export const {
    getTodoListAC,
    addTodoListAC,
    changeFilterTodoListAC
} = todolistsSlice.actions

export const fetchTodolistsTC = () =>
    async (dispatch: AppDispatch) => {

        try {
            const res = await APITodoList.getTodoList()
            dispatch(todolistsSlice.actions.getTodoListAC(res.data))
            console.log(res)
            res.data.forEach((el: TodolistsType) => dispatch(getTaskTC(el.id)))
        } catch (e) {
            console.log(e)
        }

    }
export const deleteTodoListTC = (todoListId: string) => (dispatch: AppDispatch) => {
    APITodoList.deleteTodoList(todoListId).then(res => {
        dispatch(todolistsSlice.actions.deleteTodoListAC(todoListId))
        dispatch(fetchTodolistsTC())
    }).catch((e) => {
        console.log(e)
    })
}
export const createTodoListTC = (title: string) => (dispatch: AppDispatch) => {
    APITodoList.createnNewTodoList(title).then(res => {
        dispatch(todolistsSlice.actions.addTodoListAC(res.data.data.item))
        dispatch(fetchTodolistsTC())
    })
}
export const changeTodoListTC = (title: string, todolistId: string) => (dispatch: AppDispatch) => {
    APITodoList.changeTodoList(title, todolistId).then(res => dispatch(todolistsSlice.actions.changeTitleTodoListAC({
        title,
        todolistId
    })))
}

export type FilterValuesType = 'all' | 'active' | 'completed';
export type DomainTodolist = TodolistsType & { filter: FilterValuesType }