import {AppDispatch} from "../../../../app/store";
import {APITodoList, LoginArgs, TasksState} from "../../api/APITodoList";
import {DomainTodoType} from "../../../../common/components/todoList-slice";
import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {AUTH_TOKEN} from "../../../../common/constants";

export const createAppSlice = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})
export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {IsLoggedIn:false},
    selectors: {selectIsLoggedIn: (state) => state.IsLoggedIn},
    reducers: (create) => ({
        loginTC: create.asyncThunk(
            async (result: LoginArgs, {dispatch, rejectWithValue}) => {
                try {
                    const res = await APITodoList.auth(result)
                    localStorage.setItem(AUTH_TOKEN,res.data.data.token)
                    return {IsLoggedIn:true}
                } catch (er) {
                  return   rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.IsLoggedIn = action.payload.IsLoggedIn
                },
            }
        )
    }),
})

export const authReducer = authSlice.reducer
export const {loginTC} = authSlice.actions
export const meTC = () => (dispatch: AppDispatch) => {
    APITodoList.me().then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
             //dispatch(meAC({isme:true}))
        } else console.log('you are not initialise')
    })
}
export const deleteAuthTC = () => (dispatch: AppDispatch) => {
    APITodoList.deleteauth().then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
            // dispatch(authSlice.actions.meAC({isme:false}))
        } else console.log('you are not initialise')
    })
}
export const AuthTC = (result: LoginArgs) => (dispatch: AppDispatch) => {

    APITodoList.auth(result).then(res => {
        console.log("AUTH")
        console.log(result)
        console.log(res)
        // dispatch(meAC({isme:true}))
    })
}
