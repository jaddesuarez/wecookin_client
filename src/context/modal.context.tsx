import React, {
  FC,
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";
import { useDisclosure } from "@chakra-ui/react";

export interface IModalProviderProps {
  children: ReactNode;
}

export interface IModalInfo {
  title: string;
  content: ReactNode | null;
}

export const ModalContext = createContext<any | null>(null);

export const ModalProvider: FC<IModalProviderProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalInfo, setModalInfo] = useState<IModalInfo>({
    title: "Modal Title",
    content: null,
  });

  const openModal = () => {
    onOpen();
  };

  const closeModal = () => {
    setModalInfo({
      title: "Modal Title",
      content: null,
    });
    onClose();
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalInfo, setModalInfo }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
