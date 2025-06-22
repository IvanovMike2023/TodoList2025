import {useEffect, useState} from 'react';
import s from '../app.module.css'
import {Header} from "../common/components/Header/Header";
import {Box, CircularProgress, CssBaseline, LinearProgress, ThemeProvider} from "@mui/material";
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {Routing} from "../common/routing/Routing";
import {ErrorSnackBar} from "../common/components/ErrorSnackBar/ErrorSnackBar";
import {appSlice, selectAppStatus, selectThemeMode, setIsLoggedInAC} from "@/app/app-slice";
import * as React from "react";
import {useMeQuery} from "@/features/auth/authApi";

export function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const status = useAppSelector(selectAppStatus)
    const [isInit, setisInit] = useState(false)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const { data,isLoading}=useMeQuery()
    useEffect(() => {
        if(isLoading) return
        else
            setisInit(true)
        if(data?.resultCode===0){
           dispatch(setIsLoggedInAC({IsLoggedIn:true}))
        }
    }, [isLoading])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={s.AppContainer}>
                <Header />
                {status==='loading' && <LinearProgress  />}
                {isInit ? <Routing/> : <Box className={s.status}><CircularProgress color={'info'} size={100}/></Box>}
            </div>
            <ErrorSnackBar/>
        </ThemeProvider>
    );
}

export default App;
