import React, {useEffect} from 'react';
import s from '../app.module.css'
import {Header} from "../common/components/Header/Header";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {changeThemeModeAC} from "../common/components/themeReducer";
import {selectThemeMode} from "./hooks/app-selectord";
import {meTC} from "../features/todolists/ui/Login/loginReducer";
import {Main} from "./Main";
import {Path, Routing} from "../common/routing/Routing";
import {useNavigate} from "react-router-dom";

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
        dispatch(changeThemeModeAC({
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
