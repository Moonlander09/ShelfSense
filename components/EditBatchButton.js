import { FiEdit } from "react-icons/fi";
import { Button } from "./ui/button";

function EditBatchButton({ onOpen }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
    >
      <FiEdit className="h-4 w-4" />
    </Button>
  );
}

export default EditBatchButton;
