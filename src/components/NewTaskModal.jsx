import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

function NewTaskModal({
  tasks,
  setTasks,
  newTaskModal,
  setNewTaskModal,
  directories,
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedDir, setSelectedDir] = useState("Main");
  const addNewTask = async (e) => {
    e.preventDefault();
    const newTaskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    const newTask = {
      id: newTaskId,
      title,
      date,
      description,
      isImportant,
      setIsImportant,
      isCompleted,
      setIsCompleted,
      selectedDir,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    await axios.post("http://localhost:3000/tasks", newTask);
    setNewTaskModal(false);
  };

  return (
    <Modal
      show={newTaskModal}
      onHide={setNewTaskModal}
      animation={false}
      centered
    >
      <Form onSubmit={(e) => addNewTask(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="date">Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="directory">Select a directory</Form.Label>
            <Form.Select
              name="directory"
              id="directory"
              value={selectedDir}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setSelectedDir(selectedValue);
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
              checked={isImportant}
              onChange={() => setIsImportant(!isImportant)}
              label="Mark as Important"
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              name="completed"
              id="completed"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
              label="Mark as Completed"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setNewTaskModal(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default NewTaskModal;
