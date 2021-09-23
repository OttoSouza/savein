import { StyleSheet } from "react-native";
import { globalTheme } from "../../global/globalTheme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${globalTheme.primary}`,
    justifyContent: "space-evenly",
  },
  logoImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },

  title: {
    fontSize: 56,
    color: "white",
    fontFamily: "Lobster_400Regular"
  },

  subtitle: {
    fontSize: 18,
    color: "white",
    fontFamily: "Lobster_400Regular"

  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  button: {
    flex: 5,
    backgroundColor: "#232129",
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonText: { fontSize: 16, fontFamily: "Nunito_700Bold", color: "white" },

  buttonImage: {
    flex: 1,
    backgroundColor: "#ff9000",
    height: 64,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default styles;
