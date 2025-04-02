import React, {useEffect} from 'react';
import s from '../app.module.css'
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {changeThemeModeAC} from "../common/components/themeReducer";
import {selectThemeMode} from "./hooks/app-selectord";
import {APITodoList} from "../features/todolists/api/APITodoList";
import CredentialsSignInPage from "../common/components/Login/Login";
import {meTC} from "../common/components/Login/loginReducer";

type FilterValues = 'all' | 'ative'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const isme = useAppSelector(state=>state.me.isme)
    console.log(isme)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const changeTheme = () => {
        dispatch(changeThemeModeAC({
            themeMode: themeMode === 'light' ? 'dark' : 'light'
        }))
    }
    useEffect(()=> {
       dispatch(meTC())
    },[])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={s.AppContainer}>
                <Header changeTheme={changeTheme}/>
                {isme ? <Main /> : <CredentialsSignInPage/>}
            </div>
        </ThemeProvider>
    );
}


export default App;
