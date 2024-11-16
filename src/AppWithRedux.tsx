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
import {
  changeTodolistFilterAC, 
  removeTodolistAC, 
  changeTodolistTitleAC, 
  addTodolistAC 
} from "./state/todolists-reducer";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { AppRootState } from "./state/store";

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
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);

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
            todolists.map(tl => {
              return (
                <Grid component="div">
                    <Paper style={{padding: "10px"}}>
                    <Todolist
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
