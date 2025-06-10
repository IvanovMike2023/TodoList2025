import {useEffect, useState} from 'react';
import s from '../app.module.css'
import {Header} from "../common/components/Header/Header";
import {Box, CircularProgress, CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "./hooks/useAppSelector";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {selectThemeMode} from "./hooks/app-selectord";
import {Routing} from "../common/routing/Routing";
import {setIsLoggedInAC} from "../features/todolists/ui/Login/auth-slice";
import {ErrorSnackBar} from "../common/components/ErrorSnackBar/ErrorSnackBar";
import {useMeQuery} from "@/features/todolists/api/APITodoList";

export function App() {
    const themeMode = useAppSelector(selectThemeMode)
    //const progress = useAppSelector(selectProgressMode)
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
                {/*{progress==='success' ? <></> : <LineProgress />}*/}
                {isInit ? <Routing/> : <Box className={s.progress}><CircularProgress color={'info'} size={100}/></Box>}
            </div>
            <ErrorSnackBar/>
        </ThemeProvider>
    );
}

export default App;
