import {APITodoList, LoginArgs} from "../../api/APITodoList";
import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
import {AUTH_TOKEN} from "../../../../common/constants";
import {ResultCode} from "../../../../common/enums";
import {createAppSlice} from "../../../../common/utils/createAppSlice";
import {setAppProgressAC} from "../../../../app/app-slice";

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {IsLoggedIn: false},
    selectors: {selectIsLoggedIn: (state) => state.IsLoggedIn},
    reducers: (create) => ({
        loginTC: create.asyncThunk(
            async (result: LoginArgs, {dispatch, rejectWithValue}) => {
                try {
                    const res = await APITodoList.auth(result)
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
        meTC: create.asyncThunk(
            async (_, {dispatch, rejectWithValue}) => {
                dispatch(setAppProgressAC({progress:'loading'}))
                try {
                    const res = await APITodoList.me()
                    if (res.data.resultCode===ResultCode.Success){
                        dispatch(setAppProgressAC({progress:'success'}))
                        return {IsLoggedIn: true}
                    }else {
                        console.log(res)
                        res.data.messages[0]='sssssss'
                        return {IsLoggedIn: false}
                    }

                } catch (er) {
                    console.log(er)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.IsLoggedIn = action.payload.IsLoggedIn
                }
            }
        ),
    }),
})
export const authReducer = authSlice.reducer
export const {loginTC, logoutTC, meTC} = authSlice.actions
export const {selectIsLoggedIn} = authSlice.selectors


