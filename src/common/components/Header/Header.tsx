import s from "../Header/header.module.css";
import {Switch} from "@mui/material";
import {useAppSelector} from "../../../app/hooks/useAppSelector";
import {useAppDispatch} from "../../../app/hooks/useAppDispatch";
import {appSlice, selectIsLoggedIn, selectThemeMode, setIsLoggedInAC} from "@/app/app-slice";
import {AUTH_TOKEN} from "@/common/constants";
import {baseApi} from "@/app/baseApi";
import {useLogoutMutation} from "@/features/auth/authApi";


export const Header =()=>{
const dispatch=useAppDispatch()
    const [logout]=useLogoutMutation()
    const themeMode = useAppSelector(selectThemeMode)
    const HandlechangeTheme=()=>{
        dispatch(appSlice.actions.changeThemeModeAC({
            themeMode: themeMode === 'light' ? 'dark' : 'light'
        }))
    }
    const UnLogin=()=>{
    logout().then((res)=>{
        if(res.data.resultCode===0){
            dispatch( setIsLoggedInAC({IsLoggedIn:false}))
            localStorage.removeItem(AUTH_TOKEN)
        }
    }).then(()=>{
        dispatch(baseApi.util.invalidateTags(['TodoList','Task']))
    })

    }
    const IsLoggedIn = useAppSelector(selectIsLoggedIn)

    return     (<>
                <div  className={themeMode=='dark'? s.HeadWrapperdark:s.HeadWrapperlight }  >
        <div className={s.Menu}>menu</div>
        <div className={s.Login}>
            <div>{IsLoggedIn ? <button onClick={UnLogin}>exit</button> : <div></div>}

                <Switch  onChange={HandlechangeTheme} />
            </div>
        </div>
    </div></>)

}