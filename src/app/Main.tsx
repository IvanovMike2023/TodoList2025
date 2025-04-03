import {Container, Grid} from "@mui/material";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {TodoLists} from "../features/todolists/ui/TodoLists/TodoLists";
import React from "react";
import {useAppSelector} from "./hooks/useAppSelector";
import {createTodoListTC} from "../common/components/todoListReducer";
import {useAppDispatch} from "./hooks/useAppDispatch";

export const Main=()=>{
    const dispatch = useAppDispatch()
    const isme = useAppSelector(state=>state.me.isme)
    const createTodolist = (title: string) => {
        dispatch(createTodoListTC(title))
    }
    console.log(isme)
    return(
    <Container fixed>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm onCreateItem={createTodolist}/>
        </Grid>
        <TodoLists/>
    </Container>
    )}