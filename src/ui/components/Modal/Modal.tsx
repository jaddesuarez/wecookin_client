import { FC } from "react";
import { useModal } from "@/context/modal.context";
import {
  Modal as ChakraModel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IModalProps } from "./types";

const Modal: FC<IModalProps> = ({ modalInfo }) => {
  const { isOpen, closeModal } = useModal();

  return (
    <>
      <ChakraModel isCentered isOpen={isOpen} onClose={closeModal} size="lg">
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>{modalInfo.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalInfo.content}</ModalBody>
        </ModalContent>
      </ChakraModel>
    </>
  );
};

export default Modal;
