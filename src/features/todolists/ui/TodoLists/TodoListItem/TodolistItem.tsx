import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {Tasks} from "./Tasks/Tasks";
import {FilterButtonst} from "./FilterButtons/FilterButtonst";
import {DomainTodolist} from "../../../../../common/components/todoList-slice";
import {TodoListTitle} from "@/features/todolists/ui/TodoLists/TodoListItem/TodoListTitle/TodoListTitle";
import {useCreatenNewTaskMutation} from "@/features/todolists/api/taskApi";

type Props = {
    todolist: DomainTodolist
}
export const TodolistItem = ({todolist}: Props) => {
    const [createTask]=useCreatenNewTaskMutation()
    const createTASK = (title: string) => {
        createTask({title,todolistId:todolist.id})
    }
    return <>
      <TodoListTitle todolist={todolist}/>
        <AddItemForm onCreateItem={createTASK} disabled={todolist.entityStatus==='loading'}/>
         <Tasks todolist={todolist} />
        <FilterButtonst  todolist={todolist} />

    </>
}