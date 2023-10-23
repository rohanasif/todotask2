import { useState, useEffect } from "react";
import axios from "axios";
import NewTaskModel from "./components/NewTaskModal";
import NewDirectoryModal from "./components/NewDirectoryModal";
import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import AddTaskBtn from "./components/AddTaskBtn";
import EditTaskModal from "./components/EditTaskModal";
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newDirModal, setNewDirModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [directories, setDirectories] = useState(["Main"]);
  const [originalTasks, setOriginalTasks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Tasks");

  const filteredTasks = tasks.filter((task) => {
    if (activeCategory === "Important Tasks") return task.isImportant;
    else if (activeCategory === "All Tasks") return task;
    else if (activeCategory === "Completed Tasks") return task.isCompleted;
    else if (activeCategory === "Uncompleted Tasks") return !task.isCompleted;
    else if (activeCategory === "Today's Tasks") {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const taskDate = task.date.split("T")[0];
      return taskDate === `${year}-${month}-${day}`;
    } else {
      return task.selectedDir === activeCategory;
    }
  });

  useEffect(() => {
    axios.get("http://localhost:3000/tasks").then((res) => {
      setTasks(res.data);
      setOriginalTasks(res.data);
    });
  }, [activeCategory]);

  useEffect(() => {
    axios.get("http://localhost:3000/directories").then((res) => {
      const dirData = res.data;
      const dirs = dirData.map((dir) => {
        return dir.name;
      });
      setDirectories(dirs);
    });
  }, []);

  return (
    <>
      <div className="container-fluid d-flex justify-content-between">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          setNewTaskModal={setNewTaskModal}
          setNewDirModal={setNewDirModal}
          directories={directories}
          tasks={tasks}
          setTasks={setTasks}
          originalTasks={originalTasks}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <NewTaskModel
          newTaskModal={newTaskModal}
          setNewTaskModal={setNewTaskModal}
          directories={directories}
          tasks={tasks}
          setTasks={setTasks}
        />
        <NewDirectoryModal
          directories={directories}
          setDirectories={setDirectories}
          newDirModal={newDirModal}
          setNewDirModal={setNewDirModal}
        />
        <EditTaskModal
          editTaskModal={editTaskModal}
          setEditTaskModal={setEditTaskModal}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
          directories={directories}
          tasks={tasks}
          setTasks={setTasks}
        />
        <AddTaskBtn
          setNewTaskModal={setNewTaskModal}
          setShowSidebar={setShowSidebar}
        />
      </div>
      <div className="d-flex container-fluid flex-wrap gap-2 justify-content-center">
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setEditTaskModal={setEditTaskModal}
          setTaskToEdit={setTaskToEdit}
          filteredTasks={filteredTasks}
        />
      </div>
    </>
  );
}

export default App;
