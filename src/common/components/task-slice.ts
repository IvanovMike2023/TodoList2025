import {todolistsSlice} from "./todoList-slice";
import {AppDispatch, RootState} from "../../app/store";
import {
    APITask, APITodoList,
    TaskPriorities,
    TasksState,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType
} from "../../features/todolists/api/APITodoList";
import {createAppSlice} from "../utils/createAppSlice";
import {setAppErrorAC} from "../../app/app-slice";
import {AUTH_TOKEN} from "../constants";

export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    reducers: (create) => ({
        createTaskTC: create.asyncThunk(
            async (payload: { title: string, todolistId: string }, {dispatch, rejectWithValue}) => {
                try {
                    const res = await APITask.createnNewTask(payload)
                    if (res.data.resultCode === 0) {
                        return {task: res.data.data.item}
                    } else {
                        dispatch(setAppErrorAC({error: res.data.messages[0]}))
                        return rejectWithValue(null)
                    }
                } catch (er) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                }
            }
        ),
        getTaskTC: create.asyncThunk(
            async (todolistId: string, {dispatch, rejectWithValue}) => {
                try {
                    //console.log(todolistId)
                    const res = await APITask.getTask(todolistId)
                    const task = res.data.items
                    return {todolistId, task}
                } catch (er) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId] = action.payload.task
                }
            }
        ),
        deleteTaskTC: create.asyncThunk(
            async (payload: { taskId: string, todolistId: string }, {dispatch, rejectWithValue}) => {
                try {
                    const res = await APITask.deleteTask(payload.taskId, payload.todolistId)
                    if (res.data.resultCode === 0) {
                        dispatch(getTaskTC(payload.todolistId))
                        return payload
                    } else {
                        dispatch(setAppErrorAC({error: res.data.messages[0]}))
                        return rejectWithValue(null)
                    }
                } catch (er) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const task = state[action.payload.todolistId]
                    const index = task.findIndex((el) => el.id === action.payload.taskId)
                    if (index === -1) {
                        task.splice(index, 1)
                    }
                }
            }
        ),
        updateTaskTC: create.asyncThunk(
            async (payload: {taskId: string; todolistId: string;domainModel: Partial<UpdateTaskModelType> }, {
                dispatch,
                getState,
                rejectWithValue
            }) => {
                const {todolistId, taskId, domainModel} = payload
                const allTodolistTasks = (getState() as RootState).tasks[todolistId]
                const task = allTodolistTasks.find(el => el.id === taskId)
                if (!task) {
                    return rejectWithValue(null)
                }
                const apiModel: UpdateTaskModelType = {
                    deadline: task.deadline,
                    description: task.description,
                    priority: task.priority,
                    startDate: task.startDate,
                    title: task.title,
                    status: task.status,
                    ...domainModel
                }
                try {

                    const res = await APITask.changeTask({ todolistId, taskId, apiModel })

                    if (res.data.resultCode === 0) {
                        dispatch(getTaskTC(todolistId))
                        return {todolistId, taskId, apiModel}
                    } else {
                        dispatch(setAppErrorAC({error: res.data.messages[0]}))
                        return rejectWithValue(null)
                    }
                } catch (er) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const newstate = state[action.payload.todolistId]
                    newstate.map(el => el.id === action.payload.taskId ? {...el, ...action.payload.apiModel} : {el})
                }
            }
        )
    }),

})

export const tasksReducer = tasksSlice.reducer
export const {createTaskTC, getTaskTC, deleteTaskTC,updateTaskTC} = tasksSlice.actions

