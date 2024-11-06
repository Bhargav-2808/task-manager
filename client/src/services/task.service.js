import axios from "../utils/axios";

const createTask = async (data) =>
  axios.post("/task", data).then(
    (response) => response,
    (error) => error?.response?.data
  );

const deleteTask = async () =>
  axios.delete(`/task/${id}`).then(
    (response) => response,
    (error) => error?.response?.data
  );

const updateTask = async (data, id) =>
  axios.put(`/task/${id}`, data).then(
    (response) => response,
    (error) => error?.response?.data
  );

const getTasks = async () =>
  axios.get(`/task`).then(
    (response) => response,
    (error) => error?.response?.data
  );

const taskService = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
};

export default taskService;
