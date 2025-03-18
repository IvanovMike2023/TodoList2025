import React, {useCallback, useEffect, useReducer, useState} from 'react';
import s from '../app.module.css'
import {TodolistItem} from "../features/todolists/ui/TodoLists/TodoListItem/TodolistItem";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {addTodoListAC, changeTitleTodoListAC, todolistsReducer} from "../features/todolists/model/todoListReducer";
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";

type FilterValues = 'all' | 'ative'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}
export type Task = {
    id: string
    title: string
    isdone: boolean
}
export type TasksState = {
    [key: string]: Task[]
}


function App() {

    return (
        <div className={s.AppContainer}>
            <Header/>
            <Main/>
        </div>
    );
}


export default App;
