import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function QuoteCard({ quote, author }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Daily Quote</Text>
      <Text style={styles.quote} numberOfLines={3}>
        “{quote}”
      </Text>
      {!!author && <Text style={styles.author}>— {author}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primarySoft,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  title: { color: colors.primary, fontWeight: "900", marginBottom: 10 },
  quote: { color: colors.text, fontWeight: "800", fontSize: 15, lineHeight: 20 },
  author: { marginTop: 10, color: colors.muted, fontWeight: "800", textAlign: "right" },
});
