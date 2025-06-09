import {TodolistItem} from "./TodoListItem/TodolistItem";
import {Grid, Paper} from "@mui/material";
import {useGetTodolistsQuery} from "@/features/todolists/api/APITodoList";

export const TodoLists = () => {
const {data:todolists}=useGetTodolistsQuery()
const {isLoading:isLoading }=useGetTodolistsQuery()
    console.log(isLoading)
    console.log(todolists)
    return <>
        <Grid container spacing={3}>
        {todolists?.map((todolist) => {
            return <Grid item key={todolist.id}>
                <Paper style={{padding: '10px'}}>
                    <TodolistItem todolist={todolist}
            />
                </Paper>
                    </Grid>
        })}
        </Grid>
    </>
}