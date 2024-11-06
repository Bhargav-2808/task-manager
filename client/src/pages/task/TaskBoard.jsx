import React, { useEffect, useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import TaskColumn from "./TaskColumn";
import taskService from "../../services/task.service";
import { actionTypes, useTaskContext } from "../../context/taskContext";
import { useSnackbar } from "notistack";

const TaskBoard = () => {
  const { dispatch, tasks: userTaskData, loading, moveTask } = useTaskContext();
  const [tasks, setTasks] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const getTasks = async () => {
    try {
      const tasks = await taskService.getTasks();
      const { data: taskData } = tasks.data;

      console.log(taskData?.tasks, "taskData?.tasks");
      dispatch({ type: actionTypes.SET_TASKS, payload: taskData?.tasks });
      setTasks(taskData?.tasks);
    } catch (error) {
      enqueueSnackbar(error.message || "Something went wrong", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleMoveTask = async (taskId, newStatus) => {
    console.log(taskId, newStatus);
    await moveTask(taskId, newStatus); // Use the moveTask from context
    await getTasks();
  };

  return (
    <div>
      <Button variant="contained" color="primary">
        Add Task
      </Button>
      <TextField
        placeholder="Search..."
        variant="outlined"
        style={{ margin: "20px" }}
      />

      <Grid container spacing={2}>
        <TaskColumn
          status="todo"
          title="TODO"
          tasks={tasks}
          moveTask={handleMoveTask}
        />
        <TaskColumn
          status="in_progress"
          title="IN PROGRESS"
          tasks={tasks}
          moveTask={handleMoveTask}
        />
        <TaskColumn
          status="completed"
          title="DONE"
          tasks={tasks}
          moveTask={handleMoveTask}
        />
      </Grid>
    </div>
  );
};

export default TaskBoard;
