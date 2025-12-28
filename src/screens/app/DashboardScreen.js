import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";

export default function DashboardScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: "900" }}>Dashboard</Text>
    </View>
  );
}
