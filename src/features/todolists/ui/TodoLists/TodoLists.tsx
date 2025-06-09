import {TodolistItem} from "./TodoListItem/TodolistItem";
import  {useEffect} from "react";
import {fetchTodolistsTC} from "../../../../common/components/todoList-slice";
import {useAppDispatch} from "../../../../app/hooks/useAppDispatch";
import {useAppSelector} from "../../../../app/hooks/useAppSelector";
import {Grid, Paper} from "@mui/material";
import {useGetTodolistsQuery} from "@/features/todolists/api/APITodoList";

export const TodoLists = () => {
const {data:todolists}=useGetTodolistsQuery()
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