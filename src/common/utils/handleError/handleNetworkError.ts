import {Dispatch} from "@reduxjs/toolkit";
import {setAppErrorAC} from "../../../app/app-slice";

export const handleNetworkError=(error: {messsage: string },dispatch:Dispatch)=>{
    dispatch(setAppErrorAC({error:'Network Error'}))
}