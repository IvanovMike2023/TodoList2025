import {Button, ButtonGroup} from "@mui/material";
import s from "../../../../../../common/components/todolist.module.css";
import React from "react";
import {FilterValuesType} from "../../../../../../common/components/todoListReducer";

type PropsType = {
    ButtonSetStatus: (status: FilterValuesType) => void
    filter: FilterValuesType
}
export const FilterButtonst = (props: PropsType) => {

    const ButtonHandlerActive = () => {
        props.ButtonSetStatus('active')
    }
    const ButtonHandlerCompleted = () => {
        props.ButtonSetStatus('completed')
    }
    const ButtonHandlerAll = () => {
        props.ButtonSetStatus('all')
    }
    console.log(props.filter==='all')
    return <>
        <ButtonGroup className={s.ButtonWrap} color="secondary" aria-label="Medium-sized button group">
            <Button variant={'outlined'} style={props.filter==='all'? {backgroundColor: '#38f590'}:{}} color={"inherit"} key="All" onClick={ButtonHandlerAll}>All</Button>
            <Button style={props.filter==='active'? {backgroundColor: '#38f590'}:{}} color={"primary"} key="two" onClick={ButtonHandlerActive}>Active</Button>
            <Button style={props.filter==='completed'? {backgroundColor: '#38f590'}:{}} color={"secondary"} key="three" onClick={ButtonHandlerCompleted}>Completed</Button>
        </ButtonGroup></>
}