import s from "../app.module.css";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import React from "react";
import {useDispatch} from "react-redux";
import {addTodoListAC} from "../features/todolists/model/todoListReducer";
import {TodoLists} from "../features/todolists/ui/TodoLists/TodoLists";

export const Main = () => {
    const dispatch = useDispatch();
    const createTodolist = (title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }
    return <>
        <div className={s.WrapperBody}>
            <AddItemForm onCreateItem={createTodolist}/>
        </div>
        <TodoLists/>
    </>
}