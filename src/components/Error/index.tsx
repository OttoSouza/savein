import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

import { Dialog, Portal, Button, Text } from "react-native-paper";

interface ModalProps {
  visible: boolean;
  hideDialog: () => void;
  error?: string;
}

export const Error: React.FC<ModalProps> = ({ visible, hideDialog, error }) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={{ borderRadius: 8 }}
      >
        <Dialog.Actions style={{ justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="alert" size={24} color="#ff0000" />
            <Text
              style={{
                color: "black",
                paddingLeft: 16,
                fontSize: 16,
                fontFamily: "Nunito_700Bold"
              }}
            >
              Por favor, {error}
            </Text>
          </View>
          <Button onPress={hideDialog} >Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
