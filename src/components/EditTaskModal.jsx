import { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
const EditTaskModal = ({
  taskToEdit,
  setTaskToEdit,
  tasks,
  setTasks,
  directories,
  editTaskModal,
  setEditTaskModal,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIsImportant, setNewIsImportant] = useState(false);
  const [newIsCompleted, setNewIsCompleted] = useState(false);
  const [newSelectedDir, setNewSelectedDir] = useState("Main");
  useEffect(() => {
    if (taskToEdit) {
      setNewTitle(taskToEdit.title || "");
      setNewDate(taskToEdit.date || "");
      setNewDescription(taskToEdit.description || "");
      setNewIsCompleted(taskToEdit.isCompleted || false);
      setNewIsImportant(taskToEdit.isImportant || false);
      setNewSelectedDir(taskToEdit.selectedDir || "Main");
    }
  }, [taskToEdit]);
  const editTask = async (e) => {
    e.preventDefault();
    const taskIndex = tasks.findIndex((task) => task === taskToEdit);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        id: taskToEdit.id,
        title: newTitle,
        date: newDate,
        description: newDescription,
        isImportant: newIsImportant,
        isCompleted: newIsCompleted,
        selectedDir: newSelectedDir,
      };
      setTasks(updatedTasks);
      await axios.patch(
        `http://localhost:3000/tasks/${updatedTasks[taskIndex].id}`,
        {
          title: newTitle,
          date: newDate,
          description: newDescription,
          isImportant: newIsImportant,
          isCompleted: newIsCompleted,
          selectedDir: newSelectedDir,
        }
      );
      setTaskToEdit(null);
      setEditTaskModal(false);
    }
  };
  return (
    <Modal
      show={editTaskModal}
      onHide={setEditTaskModal}
      animation={false}
      centered
    >
      <Form onSubmit={(e) => editTask(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit this Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="date">Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              id="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="desc">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="desc"
              id="desc"
              cols="30"
              rows="5"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="directory">Select a directory</Form.Label>
            <Form.Select
              name="directory"
              id="directory"
              value={newSelectedDir}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setNewSelectedDir(selectedValue);
              }}
            >
              {directories.map((dir, index) => {
                return (
                  <option value={dir} key={index}>
                    {dir}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              name="important"
              id="important"
              onChange={() => setNewIsImportant(!newIsImportant)}
              label="Mark as Important"
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              name="completed"
              id="completed"
              onChange={() => setNewIsCompleted(!newIsCompleted)}
              label="Mark as Completed"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setEditTaskModal(false);
              setTaskToEdit(null);
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
