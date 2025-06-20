import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {Tasks} from "./Tasks/Tasks";
import {FilterButtonst} from "./FilterButtons/FilterButtonst";
import {DomainTodolist, FilterValuesType} from "../../../../../common/components/todoList-slice";
import {useAppDispatch} from "@/app/hooks/useAppDispatch";
import {createTaskTC} from "@/common/components/task-slice";
import {TodoListTitle} from "@/features/todolists/ui/TodoLists/TodoListItem/TodoListTitle/TodoListTitle";
import {useCreatenNewTaskMutation, useCreatenNewTodoListMutation} from "@/features/todolists/api/APITodoList";

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
        <AddItemForm onCreateItem={createTASK}/>
         <Tasks todolist={todolist} />
        <FilterButtonst  todolist={todolist} />

    </>
}