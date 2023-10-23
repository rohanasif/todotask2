import { Offcanvas, Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AddTaskBtn from "./AddTaskBtn";
import { useState } from "react";

const Sidebar = ({
  tasks,
  setTasks,
  showSidebar,
  setShowSidebar,
  setNewTaskModal,
  setNewDirModal,
  directories,
  originalTasks,
  activeCategory,
  setActiveCategory,
}) => {
  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <Button onClick={handleShow}>
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Offcanvas show={showSidebar} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TO-DO LIST</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <AddTaskBtn
            setNewTaskModal={setNewTaskModal}
            setShowSidebar={setShowSidebar}
          />
          <ListGroup as="ul">
            <ListGroup.Item
              as="li"
              active={activeCategory === "Today's Tasks"}
              onClick={() => {
                handleCategoryClick("Today's Tasks");
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth() + 1;
                const day = currentDate.getDate();
                const todaysTasks = originalTasks.filter((task) => {
                  const taskDate = task.date.split("T")[0];
                  return taskDate === `${year}-${month}-${day}`;
                });
                setTasks(todaysTasks);
                setShowSidebar(false);
              }}
              style={{ cursor: "pointer" }}
            >
              Today&apos;s Tasks
            </ListGroup.Item>

            <ListGroup.Item
              as="li"
              active={activeCategory === "All Tasks"}
              onClick={() => {
                handleCategoryClick("All Tasks");
                setTasks(originalTasks);
                setShowSidebar(false);
              }}
              style={{ cursor: "pointer" }}
            >
              All Tasks
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              active={activeCategory === "Important Tasks"}
              onClick={() => {
                handleCategoryClick("Important Tasks");
                const importantTasks = originalTasks.filter((task) => {
                  return task.isImportant;
                });
                setTasks(importantTasks);
                setShowSidebar(false);
              }}
              style={{ cursor: "pointer" }}
            >
              Important Tasks
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              active={activeCategory === "Completed Tasks"}
              onClick={() => {
                handleCategoryClick("Completed Tasks");
                const completedTasks = originalTasks.filter((task) => {
                  return task.isCompleted;
                });
                setTasks(completedTasks);
                setShowSidebar(false);
              }}
              style={{ cursor: "pointer" }}
            >
              Completed Tasks
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              active={activeCategory === "Uncompleted Tasks"}
              onClick={() => {
                handleCategoryClick("Uncompleted Tasks");
                const uncompletedTasks = originalTasks.filter((task) => {
                  return !task.isCompleted;
                });
                setTasks(uncompletedTasks);
                setShowSidebar(false);
              }}
              style={{ cursor: "pointer" }}
            >
              Uncompleted Tasks
            </ListGroup.Item>
            <ListGroup.Item as="ul">
              Directories
              {directories.map((dir, index) => (
                <ListGroup.Item
                  as="li"
                  key={index}
                  style={{ cursor: "pointer" }}
                  active={activeCategory === directories[index]}
                  onClick={() => {
                    handleCategoryClick(directories[index]);
                    const dirTasks = originalTasks.filter((task) => {
                      return task.selectedDir === dir;
                    });
                    setTasks(dirTasks);
                    setShowSidebar(false);
                  }}
                >
                  {dir}
                </ListGroup.Item>
              ))}
              <Button
                variant="outline-dark"
                onClick={() => setNewDirModal(true)}
              >
                +New
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
