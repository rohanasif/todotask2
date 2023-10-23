import { useState } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import axios from "axios";

const NewDirectoryModal = ({
  newDirModal,
  setNewDirModal,
  directories,
  setDirectories,
}) => {
  const [newDirectory, setNewDirectory] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleCreateDirectory = async () => {
    if (directories.includes(newDirectory)) {
      setShowAlert(true);
    } else {
      const newDirObject = { name: newDirectory };
      try {
        const response = await axios.post(
          "http://localhost:3000/directories",
          newDirObject
        );
        const newDirData = response.data;
        setDirectories([...directories, newDirData.name]);
        setNewDirModal(false);
      } catch (error) {
        if (error.response) {
          console.error(
            "Server responded with an error:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request setup error:", error.message);
        }
      }
    }
  };

  return (
    <Modal
      show={newDirModal}
      onHide={() => setNewDirModal(false)}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create new directory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="dirtitle">Title</Form.Label>
        <Form.Control
          type="text"
          id="dirtitle"
          placeholder="Enter a directory name"
          value={newDirectory}
          onChange={(e) => setNewDirectory(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCreateDirectory}>
          Create
        </Button>
      </Modal.Footer>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Directory already exists. Please choose a different name.
        </Alert>
      )}
    </Modal>
  );
};

export default NewDirectoryModal;
