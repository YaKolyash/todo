import { useReducer } from "react";
import "./App.css";
import {
  TaskType, 
  Todolist 
} from "./Todolist";
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
import "./AppWithReducer";
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
import {useDispatch } from "react-redux"
// import { store } from "./state/store";

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
  const dispatch = useDispatch()

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]);

  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(id, isDone, todolistId));
  } 
  function changeTaskTitle(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskTitleAC(id, isDone, todolistId));
  } 

  // TODO
  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeTodolistFilterAC(value, todolistId));
  }

  function removeTodolist(id: string) {
    dispatch(removeTodolistAC(id));
  };
 
  function changeTodolistTitle(id: string, title: string) {
    dispatch(changeTodolistTitleAC(id, title));
  }

  function addTodolist(title: string) {
    dispatch(addTodolistAC(title));
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
                tasksForTodoList = tasksForTodoList.filter((tl) => tl.isDone === false);
              }

              if (tl.filter === "completed") {
                tasksForTodoList = tasksForTodoList.filter((tl) => tl.isDone === true);
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
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
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
