import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../theme/colors";

export default function NoteCard({ note, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.course} numberOfLines={1}>{note.course}</Text>
        <Text style={styles.body} numberOfLines={5}>{note.text}</Text>
        <Text style={styles.meta}>{note.dateLabel}</Text>
      </View>

      <Pressable onPress={() => onDelete?.(note.id)} style={({ pressed }) => [styles.del, pressed && { opacity: 0.7 }]}>
        <Text style={styles.delText}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 12,
    alignItems: "flex-start",
  },
  course: { color: colors.text, fontWeight: "900", fontSize: 14 },
  body: { color: colors.muted, fontWeight: "700", marginTop: 6, lineHeight: 18 },
  meta: { color: colors.muted, fontWeight: "800", marginTop: 8, fontSize: 12, opacity: 0.8 },

  del: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  delText: { color: colors.primary, fontWeight: "900" },
});
