import {TodolistItem} from "./TodoListItem/TodolistItem";
import {Box, Grid, Paper} from "@mui/material";
import {useGetTodolistsQuery} from "@/features/todolists/api/APITodoList";
import {TodolistSkeleton} from "@/features/todolists/ui/TodoLists/TodoListSkeleton/TodoListSkeleton";
import {containerSx} from "@/common/styles";

export const TodoLists = () => {
const {data:todolists,isLoading }=useGetTodolistsQuery()
    if (isLoading) {
        return (
            <Box sx={containerSx} style={{ gap: "32px" }}>
                {Array(3)
                    .fill(null)
                    .map((_, id) => (
                        <TodolistSkeleton key={id} />
                    ))}
            </Box>
        )
    }
    return <>
        <Grid container spacing={3}>

        {todolists?.map((todolist) => {
            return <Grid item key={todolist.id}>
                <Paper style={{padding: '10px'}}>
                    <TodolistItem todolist={todolist}/>
                </Paper>
                    </Grid>
        })}
        </Grid>
    </>
}