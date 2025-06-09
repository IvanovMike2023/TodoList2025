import DeleteIcon from "@mui/icons-material/Delete"

import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import {DomainTodolist} from "@/common/components/todoList-slice";
import {TasksState} from "@/features/todolists/api/APITodoList";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";
import {deleteTaskTC, updateTaskTC} from "@/common/components/task-slice";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";

type Props = {
    task: TasksState
    todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskTC({ todolistId: todolist.id, taskId: task.id }))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(
            updateTaskTC({
                todolistId: todolist.id,
                taskId: task.id,
                domainModel: { status: newStatusValue  },
            }),
        )
    }

    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel: { title } }))
    }

    const isTaskCompleted = task.status === 2
   // const disabled = todolist === "loading"
    return (
        <ListItem sx={getListItemSx(isTaskCompleted)}>
            <div>
                <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={true} />
                <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={false} />
            </div>
            <IconButton onClick={deleteTask} disabled={true}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
