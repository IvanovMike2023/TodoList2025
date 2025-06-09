import s from "@/common/components/todolist.module.css";
import {Editablespan} from "@/features/todolists/ui/TodoLists/TodoListItem/Tasks/editablespan";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodoListTC, deleteTodoListTC, DomainTodolist} from "@/common/components/todoList-slice";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";
import IconButton from "@mui/material/IconButton"

type  Props={
    todolist: DomainTodolist
}
export  const TodoListTitle=({todolist}: Props)=>{
    const dispatch = useAppDispatch();
    const { id, title, entityStatus } = todolist
    console.log(title)
    const changeTitleTodolist = (title: string) => {
        dispatch(changeTodoListTC(title,id))
    }
    const deleteTitleTodolist = () => {
        dispatch(deleteTodoListTC(id))    }

    return   <div className={s.TitleTodoList}>
        <Editablespan title={title} changeTaskTitle={changeTitleTodolist}/>
        <IconButton color="primary"><DeleteIcon onClick={deleteTitleTodolist} color={'action'}/></IconButton>
    </div>
}