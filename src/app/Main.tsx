import {Container, Grid} from "@mui/material";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {TodoLists} from "../features/todolists/ui/TodoLists/TodoLists";
import React, {useEffect} from "react";
import {createTodoListTC} from "../common/components/todoList-slice";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {meTC} from "../features/todolists/ui/Login/auth-slice";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppSelector} from "./hooks/useAppSelector";
import {Path} from "../common/routing/Routing";


export const Main = () => {

    const dispatch = useAppDispatch()
    const createTodolist = (title: string) => {
        dispatch(createTodoListTC(title))
    }
    const navigate=useNavigate()
    const IsLoggedIn = useAppSelector(state=>state.auth.IsLoggedIn)
    console.log(IsLoggedIn)
    useEffect(() => {
        dispatch(meTC())
    }, [])
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