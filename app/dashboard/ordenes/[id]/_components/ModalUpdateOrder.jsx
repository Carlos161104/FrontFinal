import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
import { LuPen } from "react-icons/lu";
  
  export default function ModalUpdateOrder({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleButtonClick = () => {
      onOpen();
    };
  
    return (
      <div>
        <Button onPress={handleButtonClick} className="bg-slate-500 p-2 rounded-lg">
          <LuPen className="text-3xl" />
        </Button>
        <Modal
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 h-auto"
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalContent className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto h-auto">
            <ModalBody className="p-4">{children}</ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  }
  