import s from "../../../../../../common/components/todolist.module.css";
import {Checkbox, IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, DetailedHTMLProps, HTMLAttributes, KeyboardEvent, MouseEventHandler, useState} from "react";
import {TaskType} from "../../../../api/APITodoList";

type PropsTasksType = {
    tasks: TaskType[]
    deleteTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (title: string, taskId: string,todolistId:string) => void
    todoListId: string,

}
export const Tasks = (props: PropsTasksType) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState('')
    const [taskId, settaskId] = useState('')
    const OnTaskTitleHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setEdit(true)
        settaskId(e.currentTarget.id)
    }
    const OfTaskTitleHandler = () => {
        props.changeTaskTitle(title,taskId,props.todoListId)
        setEdit(false)
    }
    const EditTaskTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }
    const EditKeyDownTaskTitleHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setEdit(false)
        }
    }
    return <>   {props.tasks.map((el) => {
        return <div key={el.id}>
            {edit && taskId === el.id ? <TextField size="small" onKeyDown={EditKeyDownTaskTitleHandler}
                                                   onChange={EditTaskTitleHandler} value={title}
                                                   onBlur={OfTaskTitleHandler}
                                                   label="Введите название" variant="outlined"/>
                : <div  key={el.id}  className={s.TaskItems}>
                    <div><Checkbox defaultChecked/>
                       <span id={el.id} onClick={OnTaskTitleHandler}>{el.title}</span> </div>
                    <IconButton color="primary"><DeleteIcon style={{width: '20px'}}
                                                            onClick={() => props.deleteTask(props.todoListId, el.id)}
                                                            color={'action'}/></IconButton>
                </div>}
        </div>
    })}</>
}


