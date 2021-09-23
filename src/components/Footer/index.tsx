import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { styles } from "./styles";

interface FooterProps {
  title: string;
  setTitle: (title: string) => void;
  numberLimited?: number;
  quantityLetter?: () => void;
  handleAddTask: () => void;
  editIdea: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  title,
  setTitle,
  numberLimited,
  quantityLetter,
  handleAddTask,
  editIdea = false
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        mode="flat"
        placeholder="Digite sua ideia"
        value={title}
        style={styles.textInput}
        onChangeText={setTitle}
        onChange={quantityLetter}
        maxLength={20}
        numberOfLines={20}
        // right={<TextInput.Affix text={`${numberLimited}/30`} />}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleAddTask}
        style={styles.button}
      >
        <MaterialCommunityIcons name={editIdea ? "pencil" : "plus"} size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};
