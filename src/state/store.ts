import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer()
});

type AppRootState = ReturnType<typeof rootReducer>

export const store = configureStore(rootReducer);


// @ts-ignore
window.store = store;