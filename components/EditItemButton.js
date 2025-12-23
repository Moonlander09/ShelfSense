// components/EditFoodItemButton.jsx
import { FiEdit } from "react-icons/fi";
import { Button } from "./ui/button";

function EditItemButton({ onOpen }) {
  return (
    <Button
      variant="ghost"
      className="p-2 rounded-md"
      onClick={(e) => {
        e.stopPropagation();
        onOpen(); // parent handles opening & id
      }}
    >
      <FiEdit />
    </Button>
  );
}

export default EditItemButton;