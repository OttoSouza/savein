import { StyleSheet } from "react-native";
import { globalTheme } from "../../global/globalTheme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${globalTheme.background}`,
    height: 100,
  
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 4,
    marginLeft: 16
  },
});

export default styles;
