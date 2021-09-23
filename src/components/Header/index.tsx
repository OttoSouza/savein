import React from "react";
import { View, Text, Image } from "react-native";
import { Appbar } from "react-native-paper";
import { useAuth } from "../../hooks/useAuth";
import SignOutModal from "../SignOutModal";
import styles from "./styles";

interface HeaderProps {
  title: string;
  photo?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, photo }) => {
  const { signOut } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(!visible);

  function handleSignOut() {
    setVisible(true);
  }

  return (
    <>
      <Appbar.Header style={styles.container}>
        <Image source={{ uri: photo }} style={styles.avatar} />
        <View style={styles.content}>
          <View style={{ paddingLeft: 16 }}>
            <Text
              style={{ fontSize: 24, color: "white", fontFamily: "Nunito_400Regular" }}
            >
              Bem vindo,
            </Text>
            <Text
              style={{ fontSize: 24, color: "#ff9000", fontFamily: "Nunito_700Bold" }}
            >
              {title}
            </Text>
          </View>
          <Appbar.Action icon="logout" color="white" onPress={handleSignOut} />
        </View>
      </Appbar.Header>
      <SignOutModal visible={visible} hideModal={hideModal} />
    </>
  );
};
