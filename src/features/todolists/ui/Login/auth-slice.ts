import {APITask, APITodoList, LoginArgs} from "../../api/APITodoList";
import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {AUTH_TOKEN} from "../../../../common/constants";
import {ResultCode} from "../../../../common/enums";
import {createAppSlice} from "../../../../common/utils/createAppSlice";
import {setAppErrorAC, setAppProgressAC} from "../../../../app/app-slice";
import {handleError} from "../../../../common/utils/handleError/handleError";
import {handleNetworkError} from "../../../../common/utils/handleError/handleNetworkError";

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {IsLoggedIn: false},
    selectors: {selectIsLoggedIn: (state) => state.IsLoggedIn},
    reducers: (create) => ({
        loginTC: create.asyncThunk(
            async (result: LoginArgs, {dispatch, rejectWithValue}) => {
                try {
                    const res = await APITask.auth(result)
                    localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                    return {IsLoggedIn: true}
                } catch (er) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.IsLoggedIn = action.payload.IsLoggedIn
                }
            }
        ),
        logoutTC: create.asyncThunk(
            async (state, {dispatch, rejectWithValue}) => {
                try {
                    const res = await APITodoList.logout()
                    localStorage.removeItem(AUTH_TOKEN)
                    return {IsLoggedIn: false}
                } catch (er) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.IsLoggedIn = action.payload.IsLoggedIn
                }
            }
        ),
        // meTC: create.asyncThunk(
        //     async (_, {dispatch, rejectWithValue}) => {
        //         dispatch(setAppProgressAC({progress:'loading'}))
        //         try {
        //             const res = await APITask.me()
        //             if (res.data.resultCode===ResultCode.Success){
        //                 dispatch(setAppProgressAC({progress:'success'}))
        //                 return {IsLoggedIn: true}
        //             }else {
        //                 handleError(res.data,dispatch)
        //                 return {IsLoggedIn: false}
        //             }
        //         } catch (er:any) {
        //             handleNetworkError(er,dispatch)
        //             return rejectWithValue(null)
        //         }
        //     },
        //     {
        //         fulfilled: (state, action) => {
        //             state.IsLoggedIn = action.payload.IsLoggedIn
        //         }
        //     }
        // ),
        setIsLoggedInAC:create.reducer<{IsLoggedIn:boolean}>((state,action)=>{
            state.IsLoggedIn = action.payload.IsLoggedIn
        })
    }),
})
export const authReducer = authSlice.reducer
export const {loginTC, logoutTC, meTC,setIsLoggedInAC} = authSlice.actions
export const {selectIsLoggedIn} = authSlice.selectors


