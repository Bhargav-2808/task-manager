import React from "react";
import TaskBoard from "./TaskBoard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Task = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <TaskBoard />
    </DndProvider>
  );
};

export default Task;
