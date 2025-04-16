import {createTaskAC, tasksReducer, tasksSlice} from "./common/components/task-slice";
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
                id: "2",
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
                id: "3",
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
                id: "4",
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
                id: "1323",
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
                id: "23",
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

    const endState = tasksReducer(Tasks, tasksSlice.actions.createTaskAC({
        task: {
            id: "11",
            title: "CSS",
            status: TaskStatuses.New,
            todoListId: "todolistId1",
            description: "",
            startDate: "",
            completed: true,
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low,
        }
    }))
    expect(endState[todoListId1].length).toBe(5)
})
