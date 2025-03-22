import {useEffect, useState} from "react";
import axios from "axios";
import {useAppDispatch} from "../../../app/hooks/useAppDispatch";
import {getTodoListAC} from "../todoListReducer";
const token = "ef7ff5dd-c4a1-4818-a09c-d1c24bd17361"
export type TodolistsType=
    { id: string, title: string, addDate: string, order: number }
export const AppTttpRequest=()=>{
const dispatch = useAppDispatch()
    const [state,setState]=useState<TodolistsType[]>([])
    useEffect(()=>{
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',{headers: {
                "Authorization": `Bearer ${token}`
            }}).then(res=>{
            setState(res.data)
            //debugger
           dispatch(getTodoListAC(res.data))
            console.log(res.data)
        })
    },[])
    return <>
        {state.map(el=>{
            return <span>{el.id}</span>
        })}
    </>
}