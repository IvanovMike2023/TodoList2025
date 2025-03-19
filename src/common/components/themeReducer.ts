import {createAction, createReducer} from "@reduxjs/toolkit";

export type ThemeMode='dark' | 'light'

const initialState = {
    themeMode: 'light' as ThemeMode,
}
export const changeThemeModeAC=createAction<{ themeMode: ThemeMode }>('SET-THEME')

export const counterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeThemeModeAC, (state, action) => {
          state.themeMode=action.payload.themeMode
        })
})

type ActionsType = ReturnType<typeof changeThemeModeAC>