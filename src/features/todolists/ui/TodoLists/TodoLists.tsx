import {TodolistItem} from "./TodoListItem/TodolistItem";
import {buttonClasses, Grid, Paper} from "@mui/material";
import {useGetTodolistsQuery, useLazyTodolistsQuery} from "@/features/todolists/api/APITodoList";

export const TodoLists = () => {
const {data:todolists }=useGetTodolistsQuery()
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