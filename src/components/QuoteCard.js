import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { useThemeStore } from "../store/themeStore";

export default function QuoteCard({ quote, author }) {
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
      <Text style={[styles.quote, { color: isDark ? dark.text : colors.text }]}>
        “{quote}”
      </Text>

      <Text style={[styles.author, { color: isDark ? dark.muted : colors.muted }]}>
        — {author}
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
  quote: {
    fontWeight: "800",
    lineHeight: 20,
  },
  author: {
    fontWeight: "700",
    fontSize: 12,
    textAlign: "right",
  },
});
