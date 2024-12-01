import "./TodoList.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addTask,
  deleteTask,
  favoriteTask,
  filterTask,
} from "../../store/slices/tasksSlice.ts";

const TodoList = () => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  const [newTasks, setNewTasks] = useState("");

  const onAddTask = () => {
    if (newTasks.trim() === "") {
      return;
    }
    dispatch(addTask(newTasks));
    setNewTasks("");
  };

  const removeTask = (id: number): void => {
    dispatch(deleteTask(id));
    console.log(tasks);
  };

  const isFavoriteTask = (id: number): void => {
    dispatch(favoriteTask(id));
  };

  const handleFilterChange = (
    filter: "all" | "completed" | "incomplete",
  ): void => {
    dispatch(filterTask(filter));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    }
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <input
        value={newTasks}
        onChange={(e) => setNewTasks(e.target.value)}
        type="text"
        className="new-task-input"
        placeholder="Add a new task"
      />
      <button onClick={onAddTask} className="add-task-button">
        Add Task
      </button>

      <div className="filters">
        <button
          onClick={() => handleFilterChange("all")}
          className="filter-button"
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
          className="filter-button"
        >
          Completed
        </button>
        <button
          onClick={() => handleFilterChange("incomplete")}
          className="filter-button"
        >
          Incomplete
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => {
          return (
            <li key={task.id}>
              <span
                style={{
                  color: task.completed ? "red" : "black",
                }}
              >
                {" "}
                {task.title}
              </span>
              <button onClick={() => isFavoriteTask(task.id)}>&#9733;</button>
              <button onClick={() => removeTask(task.id)}>&#10006;</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
