import {createSlice} from "@reduxjs/toolkit";

export type ThemeMode='dark' | 'light'



export const appSlice=createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode
    },
    reducers:(creatore)=>({
            changeThemeModeAC: creatore.reducer<{ themeMode: ThemeMode }>((state,action)=>{
                state.themeMode=action.payload.themeMode
            }),
    }),
})


export const appReduser = appSlice.reducer
export const {changeThemeModeAC} = appSlice.actions
