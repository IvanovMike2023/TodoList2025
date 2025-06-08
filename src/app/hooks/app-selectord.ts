import {RootState} from "../store";
import {ProgresType, ThemeMode} from "../app-slice";

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
export const selectProgressMode = (state: RootState): ProgresType => state.app.progress
