import {createSlice} from "@reduxjs/toolkit";

export type ThemeMode = 'dark' | 'light'
export type ProgresType = 'success' | 'loading'
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        error: null as string | null,
        progress: 'ssuccess' as ProgresType
    },

    reducers: (creatore) => ({
        changeThemeModeAC: creatore.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppErrorAC: creatore.reducer<{error:  string | null}>((state, action) => {
            state.error = action.payload.error
        }),
        setAppProgressAC: creatore.reducer<{progress:  ProgresType}>((state, action) => {
            state.progress = action.payload.progress
        }),
    }),
})
export const appReducer = appSlice.reducer
export const {changeThemeModeAC,setAppErrorAC,setAppProgressAC} = appSlice.actions
