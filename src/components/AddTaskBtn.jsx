import { Button } from "react-bootstrap";

const AddTaskBtn = ({ setNewTaskModal, setShowSidebar }) => {
  return (
    <Button
      variant="primary"
      onClick={() => {
        setNewTaskModal(true);
        setShowSidebar(false);
      }}
    >
      Add new task
    </Button>
  );
};

export default AddTaskBtn;
