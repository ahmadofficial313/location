import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function IconButton({ size, color, name, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.buton, pressed && styles.press]}
      onPress={onPress}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
}
export default IconButton;

const styles = StyleSheet.create({
  buton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  press: {
    opacity: 0.7,
  },
});
