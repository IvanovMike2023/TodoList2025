import s from "../app.module.css";
import {IconButton, TextField} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, {useState} from "react";
type Props={
    addTask?:(title:string)=>void
}
export const AddItem = (props:Props) => {
    const [text,setText]=useState('')
    console.log(props)
    const addTitle=()=>{
        props.addTask ?  props.addTask('csac') : console.log('error')
    }
    const handleTextFieldChange=(e:any)=>{
        setText(e.target.value)
    }
    return <>
        <div className={s.ButtonAdd}>
            <TextField id="outlined-basic" value={text} onChange={handleTextFieldChange}  label="Введите название" variant="outlined" />
            <IconButton onClick={addTitle} color="primary"><AddBoxOutlinedIcon color={"primary"}/></IconButton>
        </div>
    </>
}