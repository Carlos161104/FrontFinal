import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";

export default function ModalClient({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleButtonClick = () => {
    onOpen();
  };

  return (
    <div className="px-5">
      <Button onPress={handleButtonClick} className="bg-slate-500 rounded-lg w-40">
        Cliente
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
