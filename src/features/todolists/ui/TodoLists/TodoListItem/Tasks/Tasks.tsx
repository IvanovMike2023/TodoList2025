import {TaskItem} from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import {DomainTodolist} from "@/common/components/todoList-slice";
import {useGetTaskQuery} from "@/features/todolists/api/APITodoList";
import {containerSx} from "@/common/styles";
import {Box} from "@mui/material";
import {TasksSkeleton} from "@/features/todolists/ui/TodoLists/TodoListItem/Tasks/TasksSkeleton/TasksSkeleton";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist
    const {data: tasks, isLoading} = useGetTaskQuery(id)
    const todolistTasks = tasks?.items
    let filteredTasks = todolistTasks
    if (filter === "active") {
        filteredTasks = todolistTasks.filter((task) => task.status === 0)
    }
    if (filter === "completed") {
        filteredTasks = todolistTasks.filter((task) => task.status === 2)
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


    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist}/>)}</List>
            )}
        </>
    )
}
