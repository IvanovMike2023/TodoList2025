import {Navigate, Outlet} from "react-router-dom";
import {Path} from "../../routing/Routing";
import React, {ReactNode} from "react";
import {useAppSelector} from "../../../app/hooks/useAppSelector";
type Props={
    children?:ReactNode,
    isLogin:boolean,
    redirectPath?:string
}
export const ProtectedRoute=({children,isLogin,redirectPath=Path.Login}:Props):any=>{
    debugger
    if (!isLogin) {
        return  <Navigate to={redirectPath} />
    }
    return children ? children: <Outlet/>
}