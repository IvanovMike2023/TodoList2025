import {createSlice} from "@reduxjs/toolkit";

export type ThemeMode = 'dark' | 'light'
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        error: null as string | null
    },

    reducers: (creatore) => ({
        changeThemeModeAC: creatore.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppErrorAC: creatore.reducer<{error:  string | null}>((state, action) => {
            state.error = action.payload.error
        }),
    }),
})
export const appReducer = appSlice.reducer
export const {changeThemeModeAC,setAppErrorAC} = appSlice.actions
