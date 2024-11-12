import { TasksStateType } from "../AppWithRedux";
import { v1 } from "uuid";
import type { 
    AddTodolistActionType, 
    RemoveTodolistActionType
} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
};

export type AddTaskActionTypeAC = {
    type: "ADD-TASK"
    title: string
    todolistId: string
};

export type ChangeTaskStatusActionTypeAC = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    todolistId: string
    isDone: boolean
};

export type ChangeTaskTitleActionTypeAC = {
    type: "CHANGE-TASK-TITLE"
    taskId: string 
    todolistId: string
    isDone: boolean
};

type ActionsType = RemoveTaskActionType | 
AddTaskActionTypeAC | ChangeTaskStatusActionTypeAC | 
ChangeTaskTitleActionTypeAC | AddTodolistActionType | RemoveTodolistActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState
    , action: ActionsType): TasksStateType => {
    switch(action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state };
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = { ...state };
            const newTask = {
                id: v1(), 
                title: action.title, 
                isDone: false
            };
            const newTasks = [newTask, ...(state[action.todolistId] || [])];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state};

            let tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => 
                t.id === action.taskId ? {...t, isDone: action.isDone} : t)
           
            return stateCopy;
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state};

            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId)
            if(task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = []

            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state;
    }
};

export const removeTaskAC = (
    taskId: string, 
    todolistId: string
): RemoveTaskActionType => ({

    type: "REMOVE-TASK", 
    todolistId, 
    taskId
});

export const addTaskAC = (
    title: string, 
    todolistId: string
): AddTaskActionTypeAC => ({

    type: "ADD-TASK", 
    title, 
    todolistId
});

export const changeTaskStatusAC = (
    taskId: string, 
    isDone: boolean, 
    todolistId: string
): ChangeTaskStatusActionTypeAC => ({

    type: "CHANGE-TASK-STATUS", 
    taskId,
    isDone, 
    todolistId
});

export const changeTaskTitleAC = (
    taskId: string, 
    title: string, 
    todolistId: string,
    isDone: boolean
): ChangeTaskTitleActionTypeAC => ({

    type: "CHANGE-TASK-TITLE", 
    taskId, 
    todolistId,
    isDone
});
