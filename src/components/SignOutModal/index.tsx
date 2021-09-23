import React from "react";
import { Text } from "react-native";

import { Button, Dialog, Portal, Paragraph } from "react-native-paper";
import { useAuth } from "../../hooks/useAuth";
import styles from "../Header/styles";

interface Props {
  visible: boolean;
  hideModal: () => void;
}

const SignOutModal: React.FC<Props> = ({ visible, hideModal }) => {
  const { user, signOut } = useAuth();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideModal} style={{borderRadius: 8}}>
        <Dialog.Content>
          <Paragraph
            style={{
              paddingTop: 16,
              color: "black",
              textAlign: "center",
              fontSize: 20,
              fontFamily: "Nunito_700Bold",
            }}
          >
            Deseja sair, {user.name}?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "center", marginBottom: 16 }}>
          <Button
            onPress={hideModal}
            mode="outlined"
            style={{ width: 110, borderRadius: 8 }}
          >
             <Text style={{fontFamily: "Nunito_600SemiBold"}}>Cancelar</Text>
          </Button>
          <Button
            onPress={signOut}
            style={{
              backgroundColor: "#ff0000",
              marginLeft: 8,
              width: 110,
              borderRadius: 8,

            }}
            color="white"
            mode="outlined"
          >
            <Text style={{fontFamily: "Nunito_600SemiBold"}}>Sair</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SignOutModal;
