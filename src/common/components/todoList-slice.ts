import {createAppSlice} from "@/common/utils/createAppSlice";
import {APITodoList, TodolistsType} from "@/features/todolists/api/APITodoList";

export const todolistsSlice = createAppSlice({
    name: "todolist",
    initialState: [] as DomainTodolist[],
    selectors: {
        selectTodolists: (state) => state,
    },
    reducers: (create) => {
        return ({
            getTodoListTC: create.asyncThunk(
                async (_, {dispatch, rejectWithValue}) => {
                    try {
                        const res = await APITodoList.getTodolists()
                       // const todolists = TodolistSchema.array().parse(res.data)
                        const todolists = res.data.todolists
                        return {todolists}
                    } catch (error) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        return action.payload.todolists.map((todolist) => ({...todolist, filter: "all"}))
                    },
                },
            ),
            createTodoListTC: create.asyncThunk(
                async (title: string, {dispatch, rejectWithValue}) => {
                    try {
                        const res = await todolistsApi.createTodolist(title)
                        if (res.data.resultCode === ResultCode.Success) {
                            return {todolist: res.data.data.item}
                        } else {
                            return rejectWithValue(null)
                        }
                    } catch (error) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
                    },
                },
            ),
            deleteTodolistTC: create.asyncThunk(
                async (id: string, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeTodolistStatusAC({id, entityStatus: "loading"}))
                        const res = await todolistsApi.deleteTodolist(id)
                        if (res.data.resultCode === ResultCode.Success) {
                            return {id}
                        } else {
                            handleServerAppError(res.data, dispatch)
                            return rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                        if (index !== -1) {
                            state.splice(index, 1)
                        }
                    },
                },
            ),
            changeTodoListTC: create.asyncThunk(
                async (payload: { id: string; title: string }, {dispatch, rejectWithValue}) => {
                    try {
                        const res = await todolistsApi.changeTodolistTitle(payload)
                        if (res.data.resultCode === ResultCode.Success) {
                            return payload
                        } else {
                            handleServerAppError(res.data, dispatch)
                            return rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                        if (index !== -1) {
                            state[index].title = action.payload.title
                        }
                    },
                },
            ),
            changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
                const todolist = state.find((todolist) => todolist.id === action.payload.id)
                if (todolist) {
                    todolist.filter = action.payload.filter
                }
            }),
            changeTodolistStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
                const todolist = state.find((todolist) => todolist.id === action.payload.id)
                if (todolist) {
                    todolist.entityStatus = action.payload.entityStatus
                }
            }),
        });
    },
})

export const { selectTodolists } = todolistsSlice.selectors
export const {
    getTodoListTC,
    createTodoListTC,
    deleteTodoListTC,
    changeTodoListTC,
    changeTodolistFilterAC,
    changeTodolistStatusAC,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}

// const initialState: DomainTodolist[] = []
// export const todolistsSlice = createAppSlice({
//     name: 'todolist',
//     initialState: initialState,
//     reducers: (creatore) => ({
//         getTodoListAC: creatore.reducer<TodolistsType[]>((state, action) => {
//             return action.payload.map(tl => ({...tl, filter: 'all'}))
//         }),
//         addTodoListAC: creatore.reducer<{ todoList: TodolistsType }>((state, action) => {
//             return [...state]
//         }),
//         deleteTodoListAC: creatore.reducer<string>((state, action) => {
//             state.filter(fl => fl.id !== action.payload)
//         }),
//         changeTitleTodoListAC: creatore.reducer<{ title: string, todolistId: string }>((state, action) => {
//            return  state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : {...el})
//         }),
//         changeFilterTodoListAC: creatore.reducer<{ filter: FilterValuesType, todolistId: string }>((state, action) => {
//            return  state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : {...el})
//         })
//     })
// })
//
// export const todolistsReducer = todolistsSlice.reducer
// export const {
//     getTodoListAC,
//     addTodoListAC,
//     changeFilterTodoListAC
// } = todolistsSlice.actions
//
// export const fetchTodolistsTC = () =>
//     async (dispatch: AppDispatch) => {
// debugger
//         try {
//             const res = await APITodoList.getTodolists()
//             dispatch(todolistsSlice.actions.getTodoListAC(res.data))
//             res.data.forEach((el: TodolistsType) => dispatch(getTaskTC(el.id)))
//         } catch (e) {
//             console.log(e)
//         }
//
//     }
// export const deleteTodoListTC = (todoListId: string) => (dispatch: AppDispatch) => {
//     APITodoList.deleteTodoList(todoListId).then(res => {
//         dispatch(todolistsSlice.actions.deleteTodoListAC(todoListId))
//         dispatch(fetchTodolistsTC())
//     }).catch((e) => {
//         console.log(e)
//     })
// }
// export const createTodoListTC = (title: string) => (dispatch: AppDispatch) => {
//     APITodoList.createnNewTodoList(title).then(res => {
//         dispatch(todolistsSlice.actions.addTodoListAC(res.data.data.item))
//         dispatch(fetchTodolistsTC())
//     })
// }
// export const changeTodoListTC = (title: string, todolistId: string) => (dispatch: AppDispatch) => {
//     APITodoList.changeTodoList(title, todolistId).then(res => dispatch(todolistsSlice.actions.changeTitleTodoListAC({
//         title,
//         todolistId
//     })))
// }
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export type FilterValuesType = 'all' | 'active' | 'completed';
export type DomainTodolist = TodolistsType & { filter: FilterValuesType
    entityStatus: RequestStatus }