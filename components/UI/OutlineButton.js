import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
function OutlineButton({ name, children , onPress }) {
  return (
    <Pressable onPress={onPress} style={({pressed})=>[styles.Button, pressed && styles.pressed]}>
      <Ionicons style={styles.icon} size={18} color={Colors.primary500} name={name} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}
export default OutlineButton;

const styles = StyleSheet.create({
  Button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary500,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },

  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
