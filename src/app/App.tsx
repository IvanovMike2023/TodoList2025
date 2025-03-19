import React from 'react';
import s from '../app.module.css'
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
