import {Button, ButtonGroup} from "@mui/material";
import s from "../../../../../../common/components/todolist.module.css";
import {DomainTodolist, FilterValuesType, todolistsSlice} from "../../../../../../common/components/todoList-slice";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";

type PropsType = {
    todolist: DomainTodolist
}
export const FilterButtonst = ({ todolist }: PropsType) => {
    const { id, filter } = todolist
    const dispatch = useAppDispatch()

    const ButtonHandlerActive = (filter:FilterValuesType) => {
        console.log(filter,id)
        dispatch(todolistsSlice.actions.changeFilterTodoListAC({filter:filter, todolistId:id}));

    }
    const ButtonHandlerCompleted = (filter:FilterValuesType) => {
        dispatch(todolistsSlice.actions.changeFilterTodoListAC({filter:filter, todolistId:id}));
    }
    const ButtonHandlerAll = (filter:FilterValuesType) => {
        dispatch(todolistsSlice.actions.changeFilterTodoListAC({filter:filter, todolistId:id}));
    }
    return <>
        <ButtonGroup className={s.ButtonWrap} color="secondary" aria-label="Medium-sized button group">
            <Button variant={'outlined'} style={filter==='all'? {backgroundColor: '#38f590'}:{}} color={"inherit"} key="All" onClick={()=>ButtonHandlerAll('All')}>All</Button>
            <Button style={filter==='active'? {backgroundColor: '#38f590'}:{}} color={"primary"} key="two" onClick={()=>ButtonHandlerActive('active')}>Active</Button>
            <Button style={filter==='completed'? {backgroundColor: '#38f590'}:{}} color={"secondary"} key="three" onClick={()=>ButtonHandlerCompleted('completed')}>Completed</Button>
        </ButtonGroup></>
}