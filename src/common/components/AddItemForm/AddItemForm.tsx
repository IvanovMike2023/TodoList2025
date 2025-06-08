import s from "../../../app.module.css";
import {IconButton, TextField} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {useAppSelector} from "../../../app/hooks/useAppSelector";
type Props={
    onCreateItem:(title:string)=>void
}
export const AddItemForm = (props:Props) => {
    const [text,setText]=useState('')
    const [error,setError]=useState('')

    const addTitle=()=>{
        if (text.trim().length===0){
            setError('Title is required')
        }else
        props.onCreateItem(text)
        setText('')
    }

    const handleTextFieldChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setError('')
        setText(e.target.value)

    }

    const handleTextFieldCreate=(e:KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                if (text.trim().length===0){
                    setError('Title is required')
                    console.log(error)
                }else
                    props.onCreateItem(text)
                setText('')
            }
    }

    return <>
        <div className={s.ButtonAdd}>
            <TextField helperText={error}  error={!!error}   size="small" onKeyDown={handleTextFieldCreate} id="outlined-basic" value={text} onChange={handleTextFieldChange}  label="Введите название" variant="outlined" />
            <IconButton onClick={addTitle} color="primary"><AddBoxOutlinedIcon color={"primary"}/></IconButton>
        </div>
    </>
}