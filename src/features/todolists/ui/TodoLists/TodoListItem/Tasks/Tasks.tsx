import { useEffect } from "react"
import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {useAppSelector} from "@/app/hooks/useAppSelector";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";
import {getTaskTC} from "@/common/components/task-slice";
import {DomainTodolist} from "@/common/components/todoList-slice";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
   // console.log(todolist)
    const { id, filter } = todolist

    const tasks = useAppSelector((state)=>state.tasks )
    const dispatch = useAppDispatch()

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === "active") {
        filteredTasks = todolistTasks.filter((task) => task.status === 0)
    }
    if (filter === "completed") {
        filteredTasks = todolistTasks.filter((task) => task.status === 2)
    }

    useEffect(() => {
        dispatch(getTaskTC(id))
    }, [])

    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}</List>
            )}
        </>
    )
}
