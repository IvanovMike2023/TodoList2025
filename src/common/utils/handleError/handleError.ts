import {BaseResponse} from "../../../features/todolists/api/APITodoList";
import {Dispatch} from "@reduxjs/toolkit";
import {setAppErrorAC, setAppProgressAC} from "../../../app/app-slice";

export const handleError=<T>(data:BaseResponse<T>,dispatch:Dispatch)=>{
if(data.messages.length){
    dispatch(setAppErrorAC({error:data.messages[0]}))
}else dispatch(setAppErrorAC({error:'some Error'}))
    dispatch(setAppProgressAC({progress:'success'}))
}