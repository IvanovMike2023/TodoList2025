import { v1 } from "uuid";
import {addTaskAC, Taskreducer} from "./Components/reducer";

test('should add task',()=>{
    const todoListId1=v1()
    const todoListId2=v1()
    const newTask = {id: v1(), title: 'title', isdone: true}
    const Tasks ={
        [todoListId1]:[
            {id: v1(), title: 'xsax', isdone: true},
            {id: v1(), title: '33333', isdone: true},
            {id: v1(), title: '3333', isdone: true},
            {id: v1(), title: '55555', isdone: true}
        ],   [todoListId2]:[
            {id: v1(), title: '22222', isdone: true},
            {id: v1(), title: '2222', isdone: true}
        ]
    }

    const endState= Taskreducer(Tasks,addTaskAC(newTask,todoListId1))
    expect(endState[todoListId1].length).toBe(5)
})
test('should remove task',()=>{
    const todoListId1=v1()
    const todoListId2=v1()
    const newTask = {id: v1(), title: 'title', isdone: true}
    const Tasks ={
        [todoListId1]:[
            {id: v1(), title: 'xsax', isdone: true},
            {id: v1(), title: '33333', isdone: true},
            {id: v1(), title: '3333', isdone: true},
            {id: v1(), title: '55555', isdone: true}
        ],   [todoListId2]:[
            {id: v1(), title: '22222', isdone: true},
            {id: v1(), title: '2222', isdone: true}
        ]
    }

    const endState= Taskreducer(Tasks,addTaskAC(newTask,todoListId1))
    expect(endState[todoListId1].length).toBe(5)
})
