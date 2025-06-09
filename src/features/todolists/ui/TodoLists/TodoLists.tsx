import {TodolistItem} from "./TodoListItem/TodolistItem";
import  {useEffect} from "react";
import {fetchTodolistsTC} from "../../../../common/components/todoList-slice";
import {useAppDispatch} from "../../../../app/hooks/useAppDispatch";
import {useAppSelector} from "../../../../app/hooks/useAppSelector";
import {Grid, Paper} from "@mui/material";

export const TodoLists = () => {
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();
//    const {data:todolists}=useGetTodolistsQuery()
    useEffect(() => {
         dispatch(fetchTodolistsTC())
    }, [])

    return <>
        <Grid container spacing={3}>
        {todolists.map((todolist) => {
            let allTodolistTasks = tasks[todolist.id]
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