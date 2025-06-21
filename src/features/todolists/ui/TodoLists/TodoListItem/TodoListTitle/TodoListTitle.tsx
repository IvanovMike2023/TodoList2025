import s from "@/common/components/todolist.module.css";
import {Editablespan} from "@/features/todolists/ui/TodoLists/TodoListItem/Tasks/editablespan";
import DeleteIcon from "@mui/icons-material/Delete";
import {DomainTodolist, RequestStatus} from "@/common/components/todoList-slice";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";
import IconButton from "@mui/material/IconButton"
import {APITodoList, useChangeTodoListMutation, useDeleteTodoListMutation} from "@/features/todolists/api/APITodoList";

type  Props = {
    todolist: DomainTodolist
}
export const TodoListTitle = ({todolist}: Props) => {
    const {id, title, entityStatus} = todolist
    const dispatch = useAppDispatch()

    const [deleteTitleTodolist] = useDeleteTodoListMutation()
    const [changeTitleTodolist] = useChangeTodoListMutation()
    const changeTitleTodolistHandler = (title: string) => {
        changeTitleTodolist({title: title, todolistId: id})
    }
    const changeTodolistStatus = (status: RequestStatus ) => {
        dispatch(APITodoList.util.updateQueryData('getTodolists',undefined,(state)=>{
            const todolist = state.find((todolist) => todolist.id === id)
            if (todolist) {
                todolist.entityStatus = status
            }
        }));
    }
    const deleteTitleTodolistHandler = () => {
        changeTodolistStatus('loading')
        deleteTitleTodolist(id).unwrap().catch(()=>{
            changeTodolistStatus('failed')
        })
    }

    return <div className={s.TitleTodoList} >
        <Editablespan title={title} changeTaskTitle={changeTitleTodolistHandler}/>
        <IconButton disabled={entityStatus==='loading'}   onClick={deleteTitleTodolistHandler}><DeleteIcon     /></IconButton>
    </div>
}