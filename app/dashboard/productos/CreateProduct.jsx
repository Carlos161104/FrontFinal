'use client';

import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";

export default function CreateProduct({ children }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <Button className="bg-blue-700 px-7 py-2 rounded-md" onPress={onOpen} color="primary"><LuPlus size={20} /></Button>
            <Modal className="flex justify-center bg-blue-700 rounded-lg mb-" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="p-7">
                    <ModalBody className="bg-blue-300 rounded-md opa">
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}