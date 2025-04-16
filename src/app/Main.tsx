import {Container, Grid} from "@mui/material";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {TodoLists} from "../features/todolists/ui/TodoLists/TodoLists";
import React, {useEffect} from "react";
import {useAppSelector} from "./hooks/useAppSelector";
import {createTodoListTC} from "../common/components/todoList-slice";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {meTC} from "../features/todolists/ui/Login/loginReducer";
import {Login} from "../features/todolists/ui/Login/Login";

export const Main=()=>{
    const dispatch = useAppDispatch()
    const isme = useAppSelector(state=>state.me.isme)
    const createTodolist = (title: string) => {
        dispatch(createTodoListTC(title))
    }
    useEffect(()=>{
        dispatch(meTC())
    },[])

    return(
    <Container fixed>

        {isme? <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm onCreateItem={createTodolist}/>
            </Grid>
            <TodoLists/>
        </> : <Login/>}


    </Container>
    )

}