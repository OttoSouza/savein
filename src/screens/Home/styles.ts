import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flatContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  flatDivider: {
    backgroundColor: "#ff9000",
    height: "100%",
    width: 4,
  },
  flatContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  informationHeaderFlatList: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { fontSize: 24, fontFamily: "Nunito_700Bold" },
});

export default styles;
