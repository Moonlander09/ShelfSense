import { FiTrash2 } from "react-icons/fi";
import { Button } from "./ui/button";

function DeleteBatchButton({ onOpen }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-red-600"
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
    >
      <FiTrash2 className="h-4 w-4" />
    </Button>
  );
}

export default DeleteBatchButton;
