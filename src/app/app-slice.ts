import {createSlice} from "@reduxjs/toolkit";
import {authSlice} from "@/features/todolists/ui/Login/auth-slice";

export type ThemeMode = 'dark' | 'light'
export type ProgresType = 'success' | 'loading'
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        error: null as string | null,
        status: 'ssuccess' as ProgresType,
        initialState: {IsLoggedIn: false}
    },
    selectors:{
      selectThemeMode:(state)=>state.themeMode,
      selectAppStatus:(state)=>state.status,
      selectAppError:(state)=>state.error,
        selectIsLoggedIn:(state)=>state.IsLoggedIn
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppErrorAC: create.reducer<{error:  string | null}>((state, action) => {
            state.error = action.payload.error
        }),
        setAppProgressAC: create.reducer<{progress:  ProgresType}>((state, action) => {
            state.progress = action.payload.progress
        }),
        setIsLoggedInAC:create.reducer<{IsLoggedIn:boolean}>((state,action)=>{
            state.IsLoggedIn = action.payload.IsLoggedIn
        })
    }),
})
export const appReducer = appSlice.reducer
export const {changeThemeModeAC,setIsLoggedInAC,setAppErrorAC,setAppProgressAC} = appSlice.actions
export const {selectAppError,selectAppStatus,selectIsLoggedIn,selectThemeMode} = appSlice.selectors

