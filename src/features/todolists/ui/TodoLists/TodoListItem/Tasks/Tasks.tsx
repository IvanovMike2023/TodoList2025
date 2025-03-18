import s from "../../../../../../common/components/todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {Task} from "../../../../../../app/App";
type TasksType={
    tasks: Task[]
    deleteTask: (taskId: string, todolistId: string) => void
    todoListId: string,

}
export const Tasks=(props:TasksType)=>{
    return    <>   {props.tasks.map((el) => {
            return <div className={s.TaskItems}>
                <div key={el.id}><Checkbox defaultChecked/>
                    {el.title}</div>
                <IconButton color="primary"><DeleteIcon style={{width: '20px'}}
                                                        onClick={() => props.deleteTask(props.todoListId, el.id)}
                                                        color={'action'}/></IconButton>

            </div>
        })}</>
}