'use client';

import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { LuPen } from "react-icons/lu";

const ModalClient = () => {
  return (
    <ModalContent>
       {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Formulario cliente</ModalHeader>
              <ModalBody>
                
                <p>
                  Chinga tu mauser nenuco
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  <LuPen className="text-4xl"/>
                </Button>
              </ModalFooter>
            </>
          )}
    </ModalContent>
  )
}

export default ModalClient
