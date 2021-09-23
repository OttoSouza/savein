import React from "react";
import { Modal, View } from "react-native";
import { Paragraph, Dialog, Portal } from "react-native-paper";
import * as Animatable from "react-native-animatable";

interface InformationProps {
  informationVisible: boolean;
  hideInformationDialog: () => void;
}

const Information: React.FC<InformationProps> = ({
  informationVisible,
  hideInformationDialog,
}) => {
  return (
    <Portal>
      <Dialog
        visible={informationVisible}
        onDismiss={hideInformationDialog}
        style={{ borderRadius: 8 }}
      >
        <Dialog.Title style={{ color: "#ff9000", fontFamily: "Lobster_400Regular", letterSpacing: 3 }}>
          Essa aplicação contém:{" "}
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph style={{ color: "black", fontFamily: "Nunito_400Regular"}}>1. Context Api</Paragraph>
          <Paragraph style={{ color: "black", fontFamily: "Nunito_400Regular" }}>
            2. Autenticação com a Google.
          </Paragraph>
          <Paragraph style={{ color: "black", fontFamily: "Nunito_400Regular" }}>
            3. AsyncStorage: Armazenamento dos dados
          </Paragraph>
          <Paragraph style={{ color: "black", fontFamily: "Nunito_400Regular" }}>
            4. Vector Icons: Icones
          </Paragraph>
          <Paragraph style={{ color: "black", fontFamily: "Nunito_400Regular" }}>
            5. React native paper: Biblioteca com alguns componentes prontos.
          </Paragraph>
          <Paragraph style={{ color: "black", fontFamily: "Nunito_400Regular" }}>6. Navegação</Paragraph>
          <Paragraph style={{ color: "black", fontFamily: "Nunito_400Regular" }}>7. Google Fonts</Paragraph>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <Paragraph
              style={{ color: "#ff9000", fontWeight: "bold", fontSize: 16, fontFamily: "Lobster_400Regular", letterSpacing: 3 }}
            >
              !Obrigado!
            </Paragraph>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default Information;
