import {Button, ButtonGroup} from "@mui/material";
import s from "../../../../../../common/components/todolist.module.css";
import {DomainTodolist, FilterValuesType, todolistsSlice} from "../../../../../../common/components/todoList-slice";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";
import {APITodoList} from "@/features/todolists/api/APITodoList";

type PropsType = {
    todolist: DomainTodolist
}
export const FilterButtonst = ({ todolist }: PropsType) => {
    const { id, filter } = todolist
    const dispatch = useAppDispatch()

    const ButtonHandler = (filter:FilterValuesType) => {
        dispatch(APITodoList.util.updateQueryData('getTodolists',undefined,(state)=>{
            const todolist = state.find((todolist) => todolist.id === id)
            if (todolist) {
                todolist.filter = filter
            }
        }));

    }


    return <>
        <ButtonGroup className={s.ButtonWrap} color="secondary" aria-label="Medium-sized button group">
            <Button variant={'outlined'} style={filter==='all'? {backgroundColor: '#38f590'}:{}} color={"inherit"} key="All" onClick={()=>ButtonHandler('all')}>All</Button>
            <Button style={filter==='active'? {backgroundColor: '#38f590'}:{}} color={"primary"} key="two" onClick={()=>ButtonHandler('active')}>Active</Button>
            <Button style={filter==='completed'? {backgroundColor: '#38f590'}:{}} color={"secondary"} key="three" onClick={()=>ButtonHandler('completed')}>Completed</Button>
        </ButtonGroup></>
}