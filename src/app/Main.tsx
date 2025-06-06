import {Container, Grid} from "@mui/material";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {TodoLists} from "../features/todolists/ui/TodoLists/TodoLists";
import React from "react";
import {createTodoListTC} from "../common/components/todoList-slice";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "./hooks/useAppSelector";
import {Path} from "../common/routing/Routing";


export const Main = () => {
    const dispatch = useAppDispatch()
    const createTodolist = (title: string) => {
        dispatch(createTodoListTC(title))
    }
    const IsLoggedIn = useAppSelector(state=>state.auth.IsLoggedIn)
    console.log(IsLoggedIn)

     if (!IsLoggedIn) {
        return  <Navigate to={Path.Login} />
    }
    return (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm onCreateItem={createTodolist}/>
            </Grid>
            <TodoLists/>
        </Container>
    )

}