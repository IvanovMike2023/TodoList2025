import s from "../Header/header.module.css";
import React from "react";
import {Switch} from "@mui/material";
import {useAppSelector} from "../../../app/hooks/useAppSelector";
import {selectThemeMode} from "../../../app/hooks/app-selectord";
import {useNavigate} from "react-router-dom";
import {Path} from "../../routing/Routing";
import {deleteAuthTC} from "../../../features/todolists/ui/Login/auth-slice";
import {useAppDispatch} from "../../../app/hooks/useAppDispatch";

type PropsType={
    changeTheme:()=>void
}

export const Header =(props:PropsType)=>{
    const navigate=useNavigate()
const dispatch=useAppDispatch()
    const themeMode = useAppSelector(selectThemeMode)
    const HandlechangeTheme=()=>{
        props.changeTheme()
    }
    const navigareto=()=>{
        dispatch(deleteAuthTC())
              //navigate(Path.Login)
    }
    return     (<>
                <div  className={themeMode=='dark'? s.HeadWrapperdark:s.HeadWrapperlight }  >
        <div className={s.Menu}>menu</div>
        <div className={s.Login}>
            <div>

                <button onClick={navigareto}>exit</button>
                <Switch  onChange={HandlechangeTheme} />
            </div>
        </div>
    </div></>)

}