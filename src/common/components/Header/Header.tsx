import s from "../Header/header.module.css";
import React, {useEffect} from "react";
import {Switch} from "@mui/material";
import {useAppSelector} from "../../../app/hooks/useAppSelector";
import {selectThemeMode} from "../../../app/hooks/app-selectord";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks/useAppDispatch";
import {logoutTC} from "../../../features/todolists/ui/Login/auth-slice";
import {Path} from "../../routing/Routing";

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
    return     (<>
                <div  className={themeMode=='dark'? s.HeadWrapperdark:s.HeadWrapperlight }  >
        <div className={s.Menu}>menu</div>
        <div className={s.Login}>
            <div>

                <button onClick={UnLogin}>exit</button>
                <Switch  onChange={HandlechangeTheme} />
            </div>
        </div>
    </div></>)

}