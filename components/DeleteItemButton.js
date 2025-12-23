import { FiTrash2 } from "react-icons/fi";
import { Button } from "./ui/button";

function DeleteItemButton({onOpen}) {
    return (
       <Button
                  variant="ghost"
                  className="p-2 rounded-md text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen(true);
                  }}
                >
                  <FiTrash2 />
                </Button>
    )
}

export default DeleteItemButton
