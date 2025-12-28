import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function PrimaryButton({ title, onPress, variant = "primary", disabled = false }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === "ghost" && styles.ghost,
        disabled && { opacity: 0.5 },
        pressed && !disabled && { transform: [{ scale: 0.98 }], opacity: 0.95 },
      ]}
    >
      <Text style={[styles.text, variant === "ghost" && styles.ghostText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 18,
    alignItems: "center",
  },
  text: { color: "white", fontWeight: "900", fontSize: 15 },
  ghost: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  ghostText: { color: colors.primary },
});
