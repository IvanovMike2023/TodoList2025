import {TodolistItem} from "./TodoListItem/TodolistItem";
import {buttonClasses, Grid, Paper} from "@mui/material";
import {useGetTodolistsQuery, useLazyTodolistsQuery} from "@/features/todolists/api/APITodoList";

export const TodoLists = () => {
const {data:todolists,refetch }=useGetTodolistsQuery()
    return <>
        <Grid container spacing={3}>
            <div>
                <button onClick={refetch}>bbbsssssb</button>
            </div>
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