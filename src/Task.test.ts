import {createTaskAC, tasksReducer,} from "./common/components/taskReducer";
import {nanoid} from "@reduxjs/toolkit";

test('should add task',()=>{
    const todoListId1=nanoid()
    const todoListId2=nanoid()
    const newTask = {id: nanoid(), title: 'title', isdone: true}
    const Tasks ={
        [todoListId1]:[
            {id: nanoid(), title: 'xsax', isdone: true},
            {id: nanoid(), title: '33333', isdone: true},
            {id: nanoid(), title: '3333', isdone: true},
            {id: nanoid(), title: '55555', isdone: true}
        ],   [todoListId2]:[
            {id: nanoid(), title: '22222', isdone: true},
            {id: nanoid(), title: '2222', isdone: true}
        ]
    }

    const endState= tasksReducer(Tasks,createTaskAC('asd',todoListId1))
    expect(endState[todoListId1].length).toBe(5)
})
test('should remove task',()=>{
    const todoListId1=nanoid()
    const todoListId2=nanoid()
    const newTask = {id: nanoid(), title: 'title', isdone: true}
    const Tasks ={
        [todoListId1]:[
            {id: nanoid(), title: 'xsax', isdone: true},
            {id: nanoid(), title: '33333', isdone: true},
            {id: nanoid(), title: '3333', isdone: true},
            {id: nanoid(), title: '55555', isdone: true}
        ],   [todoListId2]:[
            {id: nanoid(), title: '22222', isdone: true},
            {id: nanoid(), title: '2222', isdone: true}
        ]
    }


    const endState= tasksReducer(Tasks,createTaskAC('newTask',todoListId1))
    expect(endState[todoListId1].length).toBe(5)
})
