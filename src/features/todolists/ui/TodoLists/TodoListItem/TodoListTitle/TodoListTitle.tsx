import s from "@/common/components/todolist.module.css";
import {Editablespan} from "@/features/todolists/ui/TodoLists/TodoListItem/Tasks/editablespan";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodoListTC, deleteTodoListTC, DomainTodolist} from "@/common/components/todoList-slice";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";
import IconButton from "@mui/material/IconButton"
import {useChangeTodoListMutation, useDeleteTodoListMutation} from "@/features/todolists/api/APITodoList";

type  Props = {
    todolist: DomainTodolist
}
export const TodoListTitle = ({todolist}: Props) => {
    const {id, title, entityStatus} = todolist
    const [deleteTitleTodolist] = useDeleteTodoListMutation()
    const [changeTitleTodolist] = useChangeTodoListMutation()
    const changeTitleTodolistHandler = (title: string) => {
        console.log(id)
        changeTitleTodolist({title: title, todolistId: id})
    }
    const deleteTitleTodolistHandler = () => {
        deleteTitleTodolist(id)
    }

    return <div className={s.TitleTodoList}>
        <Editablespan title={title} changeTaskTitle={changeTitleTodolistHandler}/>
        <IconButton color="primary"><DeleteIcon onClick={deleteTitleTodolistHandler} color={'action'}/></IconButton>
    </div>
}