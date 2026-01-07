import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../theme/colors";
import { useThemeStore } from "../store/themeStore";

export default function TaskCard({ task, onToggleComplete }) {
  const isDark = useThemeStore((s) => s.isDark);

  const dark = {
    card: "#0B0B10",     
    card2: "#1E1B2E",
    border: "#2C2842",
    text: "#F5F4FA",
    muted: "#A8A4C2",
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: isDark ? dark.card : colors.card,
          borderColor: isDark ? dark.border : colors.border,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
    >
      <View style={styles.left}>
        <Pressable
          onPress={() => onToggleComplete?.(task.id)}
          style={[
            styles.check,
            {
              backgroundColor: isDark ? dark.card2 : colors.card2,
              borderColor: isDark ? dark.border : colors.border,
            },
            task.completed && styles.checkOn,
          ]}
        >
          {task.completed ? <Text style={styles.checkText}>✓</Text> : null}
        </Pressable>
      </View>

      <View style={styles.mid}>
        <Text
          style={[
            styles.title,
            {
              color: isDark ? dark.text : colors.text,
            },
            task.completed && styles.done,
          ]}
          numberOfLines={1}
        >
          {task.title}
        </Text>

        <Text
          style={[
            styles.meta,
            { color: isDark ? dark.muted : colors.muted },
          ]}
        >
          Due: {task.dueLabel}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 12,
  },
  left: { width: 38, alignItems: "center", justifyContent: "center" },
  check: {
    width: 26,
    height: 26,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkText: { color: "white", fontWeight: "900" },

  mid: { flex: 1, gap: 4 },
  title: { color: colors.text, fontWeight: "900", fontSize: 15 },
  done: { color: colors.muted, textDecorationLine: "line-through" },
  meta: { color: colors.muted, fontWeight: "700", fontSize: 12 },
});
