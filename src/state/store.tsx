import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });


// @ts-ignore
window.store = store;