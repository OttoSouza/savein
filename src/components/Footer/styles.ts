import { StyleSheet } from "react-native";
import { globalTheme } from "../../global/globalTheme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 56,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: `${globalTheme.primary}`,
    fontFamily: 'Nunito_400Regular'
  },
  button: {
    backgroundColor: `${globalTheme.accent}`,
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 1,
  },
});
