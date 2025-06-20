import DeleteIcon from "@mui/icons-material/Delete"

import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import {DomainTodolist} from "@/common/components/todoList-slice";
import {
    TasksState,
    UpdateTaskModelType,
    useDeleteTaskMutation,
    useUpdateTaskMutation
} from "@/features/todolists/api/APITodoList";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";
import {deleteTaskTC, updateTaskTC} from "@/common/components/task-slice";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";

type Props = {
    task: TasksState
    todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
const [deleteTask]=useDeleteTaskMutation()
    const [updateTask]=useUpdateTaskMutation()
    const deleteTaskHandler = () => {
        deleteTask({ todolistId: todolist.id, taskId: task.id })
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
    return (
        <ListItem sx={getListItemSx(isTaskCompleted)}>
            <div>
                <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={false} />
                <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={false} />
            </div>
            <IconButton onClick={deleteTaskHandler} disabled={false}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
