import s from "../../../../../../common/components/todolist.module.css";
import {IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type TodoListTitleType={
    title: string,
    todoListId:string
    changeTitleTodolist: (title: string, id: string) => void
}
export const TodoListTitle=(props:TodoListTitleType)=>{
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.title)

    const OnTaskTitleHandler = () => {
        setEdit(true)
    }
    const OfTaskTitleHandler = () => {
        setEdit(false)
    }
    const EditTaskTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.target.value)
        props.changeTitleTodolist(e.target.value, props.todoListId)
    }
    const EditKeyDownTaskTitleHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            props.changeTitleTodolist(title, props.todoListId)
            setEdit(false)
        }
    }
    return   <div className={s.TitleTodoList}>
        {edit ?
            <TextField size="small" onKeyDown={EditKeyDownTaskTitleHandler}
                       onChange={EditTaskTitleHandler} value={props.title} onBlur={OfTaskTitleHandler}
                       label="Введите название" variant="outlined"/>
            : <p onClick={OnTaskTitleHandler}>{props.title}</p>}
        <IconButton color="primary"><DeleteIcon color={'action'}/></IconButton>
    </div>
}