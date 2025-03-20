import s from "../app.module.css";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import React from "react";
import {createTodoListAC} from "../common/components/todoListReducer";
import {TodoLists} from "../features/todolists/ui/TodoLists/TodoLists";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {AppTttpRequest} from "../common/components/Login/AppTttpRequest";

export const Main = () => {
    const dispatch = useAppDispatch();
    const createTodolist = (title: string) => {
        const action = createTodoListAC(title);
        dispatch(action);
    }
    return <>
        <div className={s.WrapperBody}>
            <AddItemForm onCreateItem={createTodolist}/>
        </div>

        <TodoLists/>
    </>
}