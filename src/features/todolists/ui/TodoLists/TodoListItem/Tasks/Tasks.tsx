import s from "../../../../../../common/components/todolist.module.css";
import {Checkbox, IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, DetailedHTMLProps, HTMLAttributes, KeyboardEvent, MouseEventHandler, useState} from "react";
import {Task} from "../../../../../../app/App";

type TasksType = {
    tasks: Task[]
    deleteTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (title: string, taskId: string,todolistId:string) => void
    todoListId: string,

}
export const Tasks = (props: TasksType) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState('')
    const [taskId, settaskId] = useState('')
    const OnTaskTitleHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setEdit(true)
        console.log(e.currentTarget.id)
        settaskId(e.currentTarget.id)
    }
    const OfTaskTitleHandler = () => {
        setEdit(false)
    }
    const EditTaskTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
        props.changeTaskTitle(title,taskId,props.todoListId)
        // props.changeTitleTodolist(e.target.value, props.todoListId)
    }
    const EditKeyDownTaskTitleHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            // props.changeTitleTodolist(title, props.todoListId)
            setEdit(false)
        }
    }
    return <>   {props.tasks.map((el) => {

        return <>
            {edit && taskId === el.id ? <TextField size="small" onKeyDown={EditKeyDownTaskTitleHandler}
                                                   onChange={EditTaskTitleHandler} value={title}
                                                   onBlur={OfTaskTitleHandler}
                                                   label="Введите название" variant="outlined"/>
                : <div id={el.id} key={el.id} onClick={OnTaskTitleHandler} className={s.TaskItems}>
                    <div><Checkbox defaultChecked/>
                        {el.title}</div>
                    <IconButton color="primary"><DeleteIcon style={{width: '20px'}}
                                                            onClick={() => props.deleteTask(props.todoListId, el.id)}
                                                            color={'action'}/></IconButton>
                </div>}
        </>
    })}</>
}


