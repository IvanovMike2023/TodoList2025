import React from 'react';
import s from '../app.module.css'
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {changeThemeModeAC, ThemeMode} from "../common/components/themeReducer";
import {dark} from "@mui/material/styles/createPalette";
import {selectThemeMode} from "./hooks/app-selectord";

type FilterValues = 'all' | 'ative'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}
export type Task = {
    id: string
    title: string
    isdone: boolean
}
export type TasksState = {
    [key: string]: Task[]
}

function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const changeTheme = () => {
        dispatch(changeThemeModeAC({
            themeMode: themeMode === 'light' ? 'dark' : 'light'
        }))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={s.AppContainer}>
                <Header changeTheme={changeTheme}/>
                <Main/>
            </div>
        </ThemeProvider>
    );
}


export default App;
