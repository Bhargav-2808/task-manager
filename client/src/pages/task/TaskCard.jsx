import React from "react";
import { useDrag } from "react-dnd";
import { Paper, Typography, Button, Box } from "@mui/material";

const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Paper
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "16px",
        marginBottom: "10px",
      }}
    >
      <Typography variant="h6">{task.title}</Typography>
      <Typography variant="body2">{task.description}</Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginRight: "8px" }}
        >
          Delete
        </Button>
        <Button variant="contained" color="primary">
          View Details
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskCard;
