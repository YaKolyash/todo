import {
    FilterValuesType,
    TodolistType
} from "../AppWithRedux";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}


type ActionsType = RemoveTodolistActionType 
                | AddTodolistActionType 
                | ChangeTodolistTitleActionType 
                | ChangeTodolistFilterActionType;

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (
    state: Array<TodolistType> = initialState,
    action: ActionsType
): Array<TodolistType> => {
    switch(action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.id === action.id);
            if(todolist) {   
                todolist.title = action.title;
            }
            
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => 
                tl.id === action.id ? { ...tl, filter: action.filter } : tl
            );
        }
    
        default:
            return state;
    }
}

export const removeTodolistAC = (
    todolistId: string
): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST", 
        id: todolistId
    }
}

export const addTodolistAC = (
    title: string
): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST", 
        title, 
        todolistId: v1()
    }
}

export const changeTodolistTitleAC = (
    todolistId: string, 
    title: string
): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title,
        id: todolistId     
    }
}

export const changeTodolistFilterAC = ( 
    filter: FilterValuesType,
    todolistId: string
): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",  
        filter,
        id: todolistId
    }
}