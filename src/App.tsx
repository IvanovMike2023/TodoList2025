import React, {useRef} from 'react';
import logo from './logo.svg';
import s from './app.module.css'
import './App.css';
import {Button, IconButton, TextField} from "@mui/material";
import Icon from '@mui/material/Icon';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {inspect} from "util";
import {Todolist} from "./Components/Todolist";
import {AddItem} from "./Components/AddItem";

function App() {
    const ref = useRef<HTMLInputElement | null>(null)

    const handleClick = (e: React.MouseEvent): void => {
        if (ref.current !== null) console.log(ref.current.value);
    };
    return (
        <div className={s.AppContainer}>
            <div className={s.HeadWrapper}>
                <div className={s.Menu}>menu</div>
                <div className={s.Login}>
                    <div>
                        <button>login</button>
                    </div>
                </div>
            </div>
            <div className={s.WrapperBody}>
                <AddItem/>
            </div>
            <div className={s.Container}>
                <Todolist title={'casac'}/>
                <Todolist title={'111111'}/>
            </div>
        </div>
    );
}

export default App;
