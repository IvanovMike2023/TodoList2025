import s from "../Header/header.module.css";
import React from "react";
import {Switch} from "@mui/material";
import {useAppSelector} from "../../../app/hooks/useAppSelector";
import {selectThemeMode} from "../../../app/hooks/app-selectord";
import {useAppDispatch} from "../../../app/hooks/useAppDispatch";
import {logoutTC, selectIsLoggedIn} from "../../../features/todolists/ui/Login/auth-slice";

type PropsType={
    changeTheme:()=>void
}

export const Header =(props:PropsType)=>{
const dispatch=useAppDispatch()
    const themeMode = useAppSelector(selectThemeMode)
    const HandlechangeTheme=()=>{
        props.changeTheme()
    }
    const UnLogin=()=>{
        dispatch( logoutTC())
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