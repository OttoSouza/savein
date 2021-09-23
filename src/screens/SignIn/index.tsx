import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Logo from "../../assets/logo3.svg";
import styles from "./styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { Error } from "../../components/Error/index";
import * as Animatable from "react-native-animatable";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const hideDialog = () => setVisible(false);

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      setError("Nao foi possivel realizar a autenticacao");
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        iterationCount={1}
        iterationDelay={500}
        useNativeDriver
      >
        <View style={styles.logoImageContainer}>
          <Logo width="100%" height={200} />

          <View style={styles.logoContainer}>
            <Text style={styles.title}>SaveIn</Text>
            <Text style={styles.subtitle}>Mantenha suas ideias salvas</Text>
          </View>
        </View>
      </Animatable.View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignInWithGoogle}
        >
          <Text style={styles.buttonText}>Entrar com a Google</Text>
        </TouchableOpacity>
        <View style={styles.buttonImage}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <SimpleLineIcons name="social-google" color="#232129" size={32} />
          )}
        </View>
      </View>
      <Error visible={visible} hideDialog={hideDialog} error={error} />
    </View>
  );
};

export default SignIn;
