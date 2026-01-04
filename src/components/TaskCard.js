import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../theme/colors";

export default function TaskCard({ task, onToggleComplete }) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && { opacity: 0.95 }]}>
      <View style={styles.left}>
        <Pressable
          onPress={() => onToggleComplete?.(task.id)}
          style={[styles.check, task.completed && styles.checkOn]}
        >
          {task.completed ? <Text style={styles.checkText}>✓</Text> : null}
        </Pressable>
      </View>

      <View style={styles.mid}>
        <Text style={[styles.title, task.completed && styles.done]} numberOfLines={1}>
          {task.title}
        </Text>
        <Text style={styles.meta}>
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
