import {createTheme} from "@mui/material";
import {ThemeMode} from '../components/themeReducer'
export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })
}