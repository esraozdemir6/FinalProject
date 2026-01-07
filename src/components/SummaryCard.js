import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { useThemeStore } from "../store/themeStore";

export default function SummaryCard({ label, value, helper }) {
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
      <Text style={[styles.label, { color: isDark ? dark.muted : colors.muted }]}>
        {label}
      </Text>

      <Text style={[styles.value, { color: isDark ? dark.text : colors.text }]}>
        {value}
      </Text>

      {!!helper && (
        <Text style={[styles.helper, { color: isDark ? dark.muted : colors.muted }]}>
          {helper}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    gap: 4,
  },
  label: {
    fontWeight: "800",
    fontSize: 12,
  },
  value: {
    fontWeight: "900",
    fontSize: 22,
  },
  helper: {
    fontWeight: "700",
    fontSize: 12,
  },
});
