import s from "../app.module.css";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import React from "react";
import {addTodoListAC, createTodoListTC} from "../common/components/todoListReducer";
import {TodoLists} from "../features/todolists/ui/TodoLists/TodoLists";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {APITodoList} from "../features/todolists/api/APITodoList";

export const Main = () => {
    const dispatch = useAppDispatch();
    const createTodolist = (title: string) => {
       dispatch(createTodoListTC(title))
    }
    return <>
        <div className={s.WrapperBody}>
            <AddItemForm onCreateItem={createTodolist}/>
        </div>

        <TodoLists/>
    </>
}