import React, {useEffect, useState} from 'react';
import s from '../app.module.css'
import {Header} from "../common/components/Header/Header";
import {Box, CircularProgress, CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {appSlice, changeThemeModeAC} from "./app-slice";
import {selectThemeMode} from "./hooks/app-selectord";
import {Routing} from "../common/routing/Routing";
import {meTC} from "../features/todolists/ui/Login/auth-slice";
import {ErrorSnackBar} from "../common/components/ErrorSnackBar/ErrorSnackBar";

function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const [isInit, setisInit] = useState(false)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const changeTheme = () => {
        dispatch(appSlice.actions.changeThemeModeAC({
            themeMode: themeMode === 'light' ? 'dark' : 'light'
        }))
    }
    useEffect(() => {
        dispatch(meTC()).unwrap()
            .finally(() => setisInit(true))
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={s.AppContainer}>
                <Header changeTheme={changeTheme}/>
                {isInit ? <Routing/> : <Box className={s.progress}><CircularProgress color={'info'} size={100}/></Box>}
            </div>
            <ErrorSnackBar/>
        </ThemeProvider>
    );
}

export default App;
