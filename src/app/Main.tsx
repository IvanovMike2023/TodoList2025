import {Container, Grid} from "@mui/material";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {TodoLists} from "../features/todolists/ui/TodoLists/TodoLists";
import {createTodoListTC} from "../common/components/todoList-slice";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {useCreatenNewTodoListMutation} from "@/features/todolists/api/APITodoList";


export const Main = () => {
   const [createTodolist]=useCreatenNewTodoListMutation()
    // const dispatch = useAppDispatch()
    // const createTodolist = (title: string) => {
    //     dispatch(createTodoListTC(title))
    // }
    return (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm onCreateItem={createTodolist}/>
            </Grid>
            <TodoLists/>
        </Container>
    )

}