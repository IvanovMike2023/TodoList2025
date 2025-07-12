import DeleteIcon from "@mui/icons-material/Delete"

import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type {ChangeEvent} from "react"
import {getListItemSx} from "./TaskItem.styles"
import {DomainTodolist} from "@/common/components/todoList-slice";

import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import {TasksState, UpdateTaskModelType} from "@/features/todolists/api/taskApi.types";
import {useDeleteTaskMutation, useUpdateTaskMutation} from "@/features/todolists/api/taskApi";


type Props = {
    task: TasksState
    todolist: DomainTodolist
    totalPages:number
    page:number
    setPage:(page:number)=>void
    lengthItemAr:number
}



export const TaskItem = ({ task, todolist,page ,setPage,lengthItemAr}: Props) => {
const [deleteTask]=useDeleteTaskMutation()
    const [updateTask]=useUpdateTaskMutation()
    const deleteTaskHandler = () => {
        deleteTask({ todolistId: todolist.id, taskId: task.id }).unwrap().then((res)=>{
            if(lengthItemAr===1)
                          setPage(page-1)

        })
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const model: UpdateTaskModelType = {
            status:e.currentTarget.checked,
            title:task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }
            updateTask({
                todolistId: todolist.id,
                taskId: task.id,
                model,
            }
        )
    }
    const changeTaskTitle = (title: string) => {
        const model: UpdateTaskModelType = {
            status:task.status,
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }
        updateTask({ todolistId: todolist.id, taskId: task.id, model })
    }
    const isTaskCompleted = task.status
    return (<>
        <ListItem sx={getListItemSx(isTaskCompleted)}>
            <div>
                <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={false} />
                <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={false} />
            </div>
            <IconButton onClick={deleteTaskHandler} disabled={false}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
        </>
    )
}
