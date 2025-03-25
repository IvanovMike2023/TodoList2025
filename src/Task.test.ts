import {createTaskAC, tasksReducer,} from "./common/components/taskReducer";
import {nanoid} from "@reduxjs/toolkit";
import {TaskPriorities, TaskStatuses, TaskType} from "./features/todolists/api/APITodoList";

test('should add task', () => {
    const todoListId1 = nanoid()
    const todoListId2 = nanoid()
    const newTask = {id: nanoid(), title: 'title', isdone: true}
    const Tasks = {
        [todoListId1]: [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                completed:true,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
            }, {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                completed:true,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
            }, {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                completed:true,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
            }, {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                completed:true,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
            },

        ], [todoListId2]: [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                completed:true,
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: "",
                startDate: "",
                completed:true,
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low,
            }
        ]
    }

    const endState = tasksReducer(Tasks, createTaskAC({
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        completed:true,
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
    }, todoListId1))
    expect(endState[todoListId1].length).toBe(5)
})
