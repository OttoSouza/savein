import React from "react";

import { Paragraph, Dialog, Portal } from "react-native-paper";
// import { Container } from './styles';
interface ModalProps {
  visible: boolean;
  hideDialog: () => void;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({visible, hideDialog, title}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius: 8}}>
        <Dialog.Content>
          <Paragraph >{title}</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

