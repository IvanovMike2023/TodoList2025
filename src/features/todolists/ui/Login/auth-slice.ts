import {AppDispatch} from "../../../../app/store";
import {APITodoList, LoginArgs, TasksState} from "../../api/APITodoList";
import {asyncThunkCreator, buildCreateSlice, createSlice} from "@reduxjs/toolkit";

export const createAppSlice = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {isme:false},
    selectors: {selectIsLoggedIn: (state) => state.isme},
    reducers: (create) => ({
        loginTC: create.asyncThunk(
            async (result: LoginArgs, {dispatch, rejectWithValue}) => {
                try {
                    debugger
                    const res = await APITodoList.auth(result)
                    console.log(res.data)
                    return {isme:true}
                } catch (er) {
                    console.log(er)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isme = true
                }
            }
        )
        // meAC: creatore.reducer<initStateType>((state,action)=>{
        // state.isme=action.payload.isme /// ??????
        // }),
    }),
})

export const authReducer = authSlice.reducer
export const {loginTC} = authSlice.actions
export const meTC = () => (dispatch: AppDispatch) => {

    APITodoList.me().then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
            // dispatch(meAC({isme:true}))
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
