import { useReducer } from "react";
import "./App.css";
import {
  TaskType, 
  Todolist 
} from "./todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Container, 
  Paper
} from '@mui/material';  
import MenuIcon from '@mui/icons-material/Menu';
import  Grid from "@mui/material/Grid2"
import "./appWithReducer";
import {
  changeTodolistFilterAC, 
  todolistsReducer, 
  removeTodolistAC, 
  changeTodolistTitleAC, 
  addTodolistAC 
} from "./state/todolists-reducer";
import { 
  addTaskAC, 
  removeTaskAC, 
  changeTaskStatusAC, 
  changeTaskTitleAC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux"

export type FilterValuesType = "all" | "active" | "completed";
  
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>;
}

function AppWithReducer() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]);

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatchToTaskReducer(action);
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId); 
    dispatchToTaskReducer(action);
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(id, isDone, todolistId);
    dispatchToTaskReducer(action);
  }
  //ПЕРЕСМОТРЕТЬ ВИДОС!!!!!!!!!!!! 
  function changeTaskTitle(id: string, newTitle: string, todolistId: string, isDone: boolean) {
    const action = changeTaskTitleAC(id, newTitle, todolistId, isDone);
    dispatchToTaskReducer(action);
  }

  // TODO
  // ШОТО СТРАННОЕ ИСПРАВИТЬ!!!!!!!!!!!!!!!!!!!!
  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(value, todolistId)
    dispatchToTaskReducer(action);
  }

  function removeTodolist(id: string) {
    const action = removeTodolistAC(id)
    dispatchToTaskReducer(action);
    dispatchToTodolistsReducer(action);
  };
 
  function changeTodolistTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatchToTodolistsReducer(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title)
    dispatchToTaskReducer(action);
    dispatchToTodolistsReducer(action);
  }

  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Photos
            </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container spacing={3} style={{padding: "10px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container>
          {
            todolists.map((tl) => {
              let tasksForTodoList = tasks[tl.id];

              if (tl.filter === "active") {
                tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
              }

              if (tl.filter === "completed") {
                tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
              }

              return (
                <Grid component="div">
                    <Paper style={{padding: "10px"}}>
                      <Todolist
                      key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      changeTaskTitle={changeTaskTitle}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                      changeTodolistTitle={changeTodolistTitle}
                      />
                    </Paper>
                </Grid>
              );
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
