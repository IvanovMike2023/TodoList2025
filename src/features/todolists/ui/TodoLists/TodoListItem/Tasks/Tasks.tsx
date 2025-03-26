import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent} from "react";
import {Editablespan} from "./editablespan";
import {TaskStatuses} from "../../../../api/APITodoList";

type PropsTasksType = {
    deleteTask: (taskId: string, todolistId: string) => void
    SetStatusTask: (status: number, taskId: string, todolistId: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    todoListId: string,
    taskId: string
    title: string
    status: TaskStatuses
}

export const Tasks = (props: PropsTasksType) => {
    const deleteHandler = () => {
        props.deleteTask(props.taskId, props.todoListId)
    }
    const ChangeTaskTitleHandler = (newtitle: string) => {
        props.changeTaskTitle(newtitle, props.taskId, props.todoListId)
    }
    const CheckTaskItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.target.checked ? TaskStatuses.Completed : TaskStatuses.New
        props.SetStatusTask(status, props.taskId, props.todoListId)
    }
    return <div>
        <Checkbox checked={props.status === TaskStatuses.Completed} onChange={CheckTaskItemHandler}/>
        <Editablespan title={props.title} changeTaskTitle={ChangeTaskTitleHandler}/>
        <IconButton onClick={deleteHandler} color="primary"><DeleteIcon style={{width: '20px'}}
                                                                        color={'action'}/></IconButton>
    </div>

}


