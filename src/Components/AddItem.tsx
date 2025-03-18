import s from "../app.module.css";
import {IconButton, TextField} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, {ChangeEvent,KeyboardEvent, useState} from "react";
type Props={
    onCreateItem:(title:string)=>void
}
export const AddItem = (props:Props) => {
    const [text,setText]=useState('')
    const addTitle=()=>{
        props.onCreateItem(text)
    }

    const handleTextFieldChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setText(e.target.value)
    }

    const handleTextFieldCreate=(e:KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                props.onCreateItem(text)
            }
    }

    return <>
        <div className={s.ButtonAdd}>
            <TextField size="small" onKeyDown={handleTextFieldCreate} id="outlined-basic" value={text} onChange={handleTextFieldChange}  label="Введите название" variant="outlined" />
            <IconButton onClick={addTitle} color="primary"><AddBoxOutlinedIcon color={"primary"}/></IconButton>
        </div>
    </>
}