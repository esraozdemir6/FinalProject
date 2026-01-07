import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../theme/colors";
import { useThemeStore } from "../store/themeStore";

export default function NoteCard({ note, onDelete }) {
  const isDark = useThemeStore((s) => s.isDark);

  const dark = {
    card: "#0B0B10",   
    border: "#2C2842",
    text: "#F5F4FA",
    muted: "#A8A4C2",
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? dark.card : colors.card,
          borderColor: isDark ? dark.border : colors.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.course, { color: isDark ? dark.text : colors.text }]}>
          {note.course}
        </Text>

        {onDelete && (
          <Pressable onPress={() => onDelete(note.id)}>
            <Text style={[styles.delete, { color: isDark ? dark.muted : colors.muted }]}>
              ✕
            </Text>
          </Pressable>
        )}
      </View>

      <Text style={[styles.body, { color: isDark ? dark.muted : colors.muted }]}>
        {note.text}
      </Text>

      <Text style={[styles.date, { color: isDark ? dark.muted : colors.muted }]}>
        {note.dateLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  course: {
    fontWeight: "900",
    fontSize: 14,
  },
  delete: {
    fontWeight: "900",
    fontSize: 14,
  },
  body: {
    fontWeight: "700",
    lineHeight: 20,
  },
  date: {
    fontWeight: "700",
    fontSize: 12,
    marginTop: 4,
  },
});
