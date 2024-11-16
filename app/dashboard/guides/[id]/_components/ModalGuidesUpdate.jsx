import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { LuPen } from "react-icons/lu";

export default function ModalGuidesUpdate({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleButtonClick = () => {
    onOpen();
  };

  return (
    <div className="px-5">
      <Button
        onPress={handleButtonClick}
        className="p-3 bg-blue-500 rounded-lg mx-5"
      >
        <LuPen className="text-3xl" />
      </Button>
      <Modal
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto max-h-screen overflow-y-auto">
          <ModalBody className="p-4">{children}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
