import s from "../Header/header.module.css";
import React from "react";
import {Switch} from "@mui/material";
import {useAppSelector} from "../../../app/hooks/useAppSelector";
import {selectThemeMode} from "../../../app/hooks/app-selectord";
import {BrowserRouter, Routes} from "react-router-dom";

type PropsType={
    changeTheme:()=>void
}
export const Header =(props:PropsType)=>{
    const themeMode = useAppSelector(selectThemeMode)
    const HandlechangeTheme=()=>{
        props.changeTheme()
    }
    //<CredentialsSignInPage/>
    return     (<>
                <div  className={themeMode=='dark'? s.HeadWrapperdark:s.HeadWrapperlight }  >
        <div className={s.Menu}>menu</div>
        <div className={s.Login}>
            <div>

                <button >login</button>
                <Switch  onChange={HandlechangeTheme} />
            </div>
        </div>
    </div></>)

}