// import { useReducer } from "react";
import "./AppWithRedux";
import "./App.css";
import {
  TaskType, 
  Todolist 
} from "./Todolist";
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
  removeTodolistAC, 
  changeTodolistTitleAC, 
  addTodolistAC 
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootState } from "./state/store";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  addTaskAC,
  removeTaskAC
} from "./state/tasks-reducer";
// import { v1 } from "uuid";  
// import { todolistsReducer } from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";
  
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>;
}

function AppWithRedux() {
  // let todolistId1 = v1();
  // let todolistId2 = v1();
  
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);
  const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);


  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(id, isDone, todolistId));
  } 

  // выяснить почему здесь newTitle: string
  function changeTaskTitle(id: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskTitleAC(id, isDone, todolistId));
  } 

  // TODO
  // изменить на todolistId: string
  function changeFilter(value: FilterValuesType, todolistId: any) {
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
            todolists.map(tl => {
             

              return (
                <Grid component="div">
                    <Paper style={{padding: "10px"}}>
                    <Todolist
                        changeTaskStatus={changeTaskStatusAC}
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        changeFilter={changeFilter}
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

export default AppWithRedux;
