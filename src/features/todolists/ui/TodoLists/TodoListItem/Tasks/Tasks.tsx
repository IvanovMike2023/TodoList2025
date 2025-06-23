import {TaskItem} from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {DomainTodolist} from "@/common/components/todoList-slice";
import {containerSx} from "@/common/styles";
import {Box, Pagination} from "@mui/material";
import {TasksSkeleton} from "@/features/todolists/ui/TodoLists/TodoListItem/Tasks/TasksSkeleton/TasksSkeleton";
import {TaskStatus} from "@/common/enums";
import {useGetTaskQuery} from "@/features/todolists/api/taskApi";
import {useEffect, useState} from "react";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist
    const {data: tasks, isLoading} = useGetTaskQuery(id)
    const todolistTasks = tasks?.items
    const [page, setPage] = useState(1)
    const [displayedItems, setdisplayedItems] = useState([])
    const itemsPerPage = 4
    const totalPages = Math.ceil(todolistTasks?.length / itemsPerPage)
    const ButtonHandler = (event, value) => {
        setPage(value)
    }
    useEffect(() => {
        if (todolistTasks != undefined) {
            setdisplayedItems(todolistTasks.slice((page - 1) * itemsPerPage, page * itemsPerPage));
        }
    }, [tasks, page])

    let filteredTasks = displayedItems//todolistTasks
    if (filter === "active") {
        filteredTasks = displayedItems.filter((task) => task.status === TaskStatus.New)
    }
    if (filter === "completed") {
        filteredTasks = displayedItems.filter((task) => task.status === TaskStatus.InProgress)
    }
    console.log(page)
    if (isLoading) {
        return (
            <Box sx={containerSx} style={{gap: "32px"}}>
                {Array(1)
                    .fill(null)
                    .map((_, id) => (
                        <TasksSkeleton key={id}/>
                    ))}
            </Box>
        )
    }

    return <>
        {filteredTasks?.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <List>{filteredTasks?.map((task) => <TaskItem lengthItemAr={filteredTasks?.length} setPage={setPage}
                                                          totalPages={totalPages} page={page}
                                                          key={task.id} task={task} todolist={todolist}/>)}
                {totalPages > 1 ? <Pagination onChange={ButtonHandler} page={page} count={totalPages}/> : <></>}
            </List>
        )}
    </>

}
