import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function SummaryCard({ label, value, helper }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {!!helper && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 4,
  },
  value: { color: colors.primary, fontWeight: "900", fontSize: 20 },
  label: { color: colors.text, fontWeight: "900", fontSize: 13 },
  helper: { color: colors.muted, fontWeight: "700", fontSize: 12, marginTop: 4 },
});
