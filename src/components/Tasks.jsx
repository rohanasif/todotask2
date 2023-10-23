import { Card, Button } from "react-bootstrap";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as RegStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const Tasks = ({
  tasks,
  setTasks,
  setEditTaskModal,
  setTaskToEdit,
  filteredTasks,
}) => {
  const handleToggleCompleted = async (index) => {
    const updatedTasks = [...filteredTasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
    await axios.patch(`http://localhost:3000/tasks/${updatedTasks[index].id}`, {
      isCompleted: updatedTasks[index].isCompleted,
    });
  };
  const handleToggleImportant = async (index) => {
    const updatedTasks = [...filteredTasks];
    updatedTasks[index].isImportant = !updatedTasks[index].isImportant;
    setTasks(updatedTasks);

    await axios.patch(`http://localhost:3000/tasks/${updatedTasks[index].id}`, {
      isImportant: updatedTasks[index].isImportant,
    });
  };
  const handleDelete = async (index) => {
    const taskId = filteredTasks[index].id;
    const updatedTasks = [...filteredTasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    await axios.delete(`http://localhost:3000/tasks/${taskId}`);
  };

  const handleEdit = async (index) => {
    setTaskToEdit(tasks[index]);
    setEditTaskModal(true);
  };

  return filteredTasks.map((t, index) => (
    <div key={index} style={{ width: "25%" }}>
      <span>{t.selectedDir}</span>
      <Card>
        <Card.Header>{t.title}</Card.Header>
        <Card.Body>
          <p>{t.description}</p>
          <span>{t.date}</span>
        </Card.Body>
        <Card.Footer>
          <Button
            variant={t.isCompleted ? "success" : "danger"}
            onClick={() => handleToggleCompleted(index)}
          >
            {t.isCompleted ? "Completed" : "Uncompleted"}
          </Button>
          <Button onClick={() => handleToggleImportant(index)}>
            {t.isImportant ? (
              <FontAwesomeIcon icon={SolidStar} />
            ) : (
              <FontAwesomeIcon icon={RegStar} />
            )}
          </Button>
          <Button onClick={() => handleDelete(index)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button onClick={() => handleEdit(index)}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
};

export default Tasks;
