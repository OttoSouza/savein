
import React from "react";
import "intl"
import "intl/locale-data/jsonp/pt-BR"
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/global/theme";
import {AuthProvider, useAuth} from "./src/hooks/useAuth";
import Routes from './src/routes/index';
import {} from "react-native"
import AppLoading from "expo-app-loading";
import {useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold} from "@expo-google-fonts/nunito"
import {Lobster_400Regular} from "@expo-google-fonts/lobster"
export default function App() {
  const {userLoading} = useAuth()
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Lobster_400Regular
  })

  if(!fontsLoaded || userLoading) {
    return <AppLoading />
  }
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
}
