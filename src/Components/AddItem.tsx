import s from "../app.module.css";
import {IconButton, TextField} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, {ChangeEvent,KeyboardEvent, useState} from "react";
type Props={
    addTask?:(title:string,id:string)=>void,
    todolistId?: string
    addTodoList?:(title:string)=>void
}
export const AddItem = (props:Props) => {
    const [text,setText]=useState('')
    const addTitle=()=>{
        props.addTask && props.todolistId ?  props.addTask(text,props.todolistId) : console.log('error')
        props.addTodoList ?  props.addTodoList(text) : console.log('error')
    }

    const handleTextFieldChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setText(e.target.value)
    }

    const handleTextFieldCreate=(e:KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                props.addTask && props.todolistId ?  props.addTask(text,props.todolistId) : console.log('error')
            }
    }

    return <>
        <div className={s.ButtonAdd}>
            <TextField onKeyDown={handleTextFieldCreate} id="outlined-basic" value={text} onChange={handleTextFieldChange}  label="Введите название" variant="outlined" />
            <IconButton onClick={addTitle} color="primary"><AddBoxOutlinedIcon color={"primary"}/></IconButton>
        </div>
    </>
}