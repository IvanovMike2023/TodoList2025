import React from 'react';
import s from '../app.module.css'
import {Header} from "../common/components/Header/Header";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {appSlice, changeThemeModeAC} from "./app-slice";
import {selectThemeMode} from "./hooks/app-selectord";
import {Routing} from "../common/routing/Routing";

type FilterValues = 'all' | 'ative'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

function App() {
    const themeMode = useAppSelector(selectThemeMode)


    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const changeTheme = () => {
        dispatch(appSlice.actions.changeThemeModeAC({
            themeMode: themeMode === 'light' ? 'dark' : 'light'
        }))
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={s.AppContainer}>
                <Header changeTheme={changeTheme}/>
                <Routing/>
            </div>
        </ThemeProvider>
    );
}


export default App;
