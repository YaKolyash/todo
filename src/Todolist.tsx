import { ChangeEvent} from "react";
import { FilterValuesType } from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm"
import { EditableSpan } from "./EditableSpan";
import {
  Checkbox, 
  Button, 
  IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { AppRootState } from "./state/store";
import {
  useDispatch, 
  useSelector
} from "react-redux"
import { 
  addTaskAC, 
  removeTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC
} from "../src/state/tasks-reducer";


export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter: (
    value: FilterValuesType, 
    todolistId: string
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (
    todolistId: string
  ) => void;
  changeTodolistTitle: (
    todolistId: string, 
    newTitle: string
  ) => void;
};

export function Todolist(props: PropsType) {

  const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);
  const dispatch = useDispatch();

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }

  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };


  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };

  let allTodolistTasks = tasks;
  let tasksForTodoList = allTodolistTasks;

  if (props.filter === "active") {
    tasksForTodoList = allTodolistTasks.filter(t => t.isDone === false);
  }

  if (props.filter === "completed") {
    tasksForTodoList = allTodolistTasks.filter(t => t.isDone === true);
  }


  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
            <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={(title) => {
        dispatch(addTaskAC(title, props.id));
      }}/>
      <div>
        {tasksForTodoList.map((t) => {
          const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
          };

          // заменить на newValue: string
          const onTitleChangeHandler = (newValue: any) => {
            dispatch(changeTaskTitleAC(t.id, newValue, props.id, title));
          };
          

          return (
            <li key={t.id} className={
                t.isDone 
                ? "is-done" 
                : ""
                }>
              <Checkbox
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <EditableSpan title={t.title} 
                            onChange={onTitleChangeHandler}/>
              <IconButton onClick={onClickHandler}>
                <DeleteIcon/>
              </IconButton>
            </li>
          );
        })}
      </div>
      <div>
        <Button
          variant={
            props.filter === "all" 
            ? "contained" 
            : "text"
          }
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={"primary"}
          variant={
            props.filter === "active" 
            ? "contained" 
            : "text"
          }
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={"secondary"}
          variant=
            {props.filter === "completed" 
              ? "contained" 
              : "text"
            }
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
