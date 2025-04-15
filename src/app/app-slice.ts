import {createSlice} from "@reduxjs/toolkit";

export type ThemeMode='dark' | 'light'



export const appSlice=createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode
    },
    reducers:(creatore)=>({
            //подредюсер или экшен криейтор
            changeThemeModeAC: creatore.reducer<{ themeMode: ThemeMode }>((state,action)=>{
                state.themeMode=action.payload.themeMode
            }),
    }),
})


export const appReduser = appSlice.reducer
export const {changeThemeModeAC} = appSlice.actions
// export const changeThemeModeAC=createAction<{ themeMode: ThemeMode }>('SET-THEME')
//
// export const appReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(changeThemeModeAC, (state, action) => {
//           state.themeMode=action.payload.themeMode
//         })
// })
//
// type ActionsType = ReturnType<typeof changeThemeModeAC>