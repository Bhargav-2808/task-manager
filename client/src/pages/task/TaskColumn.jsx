import React from "react";
import { useDrop } from "react-dnd";
import { Grid, Typography, Paper } from "@mui/material";
import TaskCard from "./TaskCard";

const TaskColumn = ({ status, title, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => { 
      console.log(item);
      return moveTask(item.id, status)},
  });


  return (
    <Grid item xs={4} ref={drop}>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
    </Grid>
  );
};

export default TaskColumn;
