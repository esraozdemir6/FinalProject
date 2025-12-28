import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { useAuthStore } from "../../store/authStore";

export default function ProfileScreen() {
  const { logout, user } = useAuthStore();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: "900" }}>Profile</Text>
      <Text style={{ color: colors.muted, fontWeight: "700" }}>{user?.email}</Text>
      <Text style={{ color: colors.primary, fontWeight: "900" }} onPress={logout}>Logout</Text>
    </View>
  );
}
