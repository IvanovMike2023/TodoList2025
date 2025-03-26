import s from "../../../../../../common/components/todolist.module.css";
import {Checkbox, IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Editablespan} from "./editablespan";

type PropsTasksType = {
    deleteTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    todoListId: string,
    taskId: string
    title: string
}

export const Tasks = (props: PropsTasksType) => {
    const deleteHandler = () => {
        props.deleteTask(props.taskId,props.todoListId)
    }
    const ChangeTaskTitleHandler=(newtitle:string)=>{
        props.changeTaskTitle(newtitle,props.taskId,props.todoListId)
    }
    return <div>
        <Checkbox defaultChecked/>
        <Editablespan title={props.title}  changeTaskTitle={ChangeTaskTitleHandler}  />
        <IconButton onClick={deleteHandler} color="primary"><DeleteIcon style={{width: '20px'}}
                                                                        color={'action'}/></IconButton>
    </div>

}


