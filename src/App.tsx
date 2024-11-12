import { useState } from "react";
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

export type FilterValuesType = "all" | "active" | "completed";
  
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>;
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {
        id: v1(),
        title: "СSS",
        isDone: true
      },
      {
        id: v1(),
        title: "JS",
        isDone: true
      },
      {
        id: v1(),
        title: "REACT",
        isDone: false
      },
      {
        id: v1(),
        title: "REDUX",
        isDone: false
      },
      {
        id: v1(),
        title: "SQL",
        isDone: false
      }
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "Book",
        isDone: true
      },
      {
        id: v1(),
        title: "Milk",
        isDone: true
      }
    ]
  });

  function removeTask(id: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = todolistTasks.filter((t) => t.id !== id);;
    
    setTasks({ ...tasks });
  }

  function addTask(title: string, todolistId: string) {
    let task = { 
      id: v1(), 
      title: title, 
      isDone: false 
    };
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks];
    
    setTasks({ ...tasks });
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find((t) => t.id === id);
    
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks });
    }
  }

  // TODO

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function removeTodolist(id: string) {
    setTodolists(todolists.filter((tl) => tl.id !== id));

    delete tasks[id];
    setTasks({ ...tasks });
  };
 
  function changeTodolistTitle(id: string, title: string) {
    const todolist = todolists.find(tl => tl.id === id);
    if(todolist) {
      todolist.title = title;
      setTodolists([...todolists]);
    }
  }

  function addTodolist(title: string) {
    let newTodoListId = v1();
    let newTodolist: TodolistType = {
      id: newTodoListId,
      title: title,
      filter: 'all'
    }
    setTodolists([newTodolist, ...todolists]); 
    setTasks({
      ...tasks,
      [newTodoListId]: []
    })
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

export default App;
