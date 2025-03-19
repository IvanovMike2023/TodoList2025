import {RootState} from "../store";
import {ThemeMode} from "../../common/components/themeReducer";


export const selectThemeMode = (state: RootState): ThemeMode => state.themeMode.themeMode
