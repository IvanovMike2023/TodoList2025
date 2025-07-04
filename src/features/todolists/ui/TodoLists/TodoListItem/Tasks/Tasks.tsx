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
    const [page, setPage] = useState(1)
    const itemsPerPage = 4

    const {id, filter} = todolist
    const {data: tasks, isLoading} = useGetTaskQuery({todolistId:id,page:page, count: 4 })
    const todolistTasks = tasks?.items
    const [displayedItems, setdisplayedItems] = useState([])
    const totalPages = Math.ceil(tasks?.totalCount / itemsPerPage)

    console.log(todolistTasks)
    const ButtonHandler = (event, value) => {
        setPage(value)
    }
    useEffect(() => {
        if (todolistTasks != undefined) {
            setdisplayedItems(todolistTasks);
        }
    }, [tasks, page])

    let filteredTasks = displayedItems//todolistTasks
    if (filter === "active") {
        filteredTasks = displayedItems.filter((task) => task.status === TaskStatus.New)
    }
    if (filter === "completed") {
        filteredTasks = displayedItems.filter((task) => task.status === TaskStatus.InProgress)
    }
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
