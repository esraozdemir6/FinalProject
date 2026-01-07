import React from "react";
import { View, Text, StyleSheet, Image, Switch } from "react-native";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
import PrimaryButton from "../../components/PrimaryButton";
import { colors as lightColors } from "../../theme/colors"; 

function getInitials(email = "") {
  const namePart = email.split("@")[0] || "User";
  const parts = namePart.replace(/[._-]/g, " ").split(" ").filter(Boolean);
  const first = (parts[0]?.[0] || "U").toUpperCase();
  const second = (parts[1]?.[0] || parts[0]?.[1] || "").toUpperCase();
  return `${first}${second}`.trim();
}

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  const colors = {
    ...lightColors,
    bg: isDark ? "#0B0B10" : lightColors.bg,
    card: isDark ? "#12121A" : lightColors.card,
    card2: isDark ? "#171721" : lightColors.card2,
    text: isDark ? "#F2F2F7" : lightColors.text,
    muted: isDark ? "#B7B7C6" : lightColors.muted,
    border: isDark ? "#2A2A36" : lightColors.border,
    primary: lightColors.primary,
    primarySoft: isDark ? "#1A1624" : lightColors.primarySoft,
    accent: lightColors.accent,
  };

  const stats = [
    { label: "Tasks Today", value: "6" },
    { label: "Sessions", value: "3" },
    { label: "Focus Hours", value: "4.35" },
  ];

  return (
    <View style={makeStyles(colors).container}>
      {/* TOP LOGO AREA */}
      <View style={makeStyles(colors).top}>
        <Image
          source={require("../../../assets/bear.png")}
          style={makeStyles(colors).logo}
          resizeMode="contain"
        />
        <Text style={makeStyles(colors).brand}>StudyFlow</Text>
        <Text style={makeStyles(colors).tagline}>Plan • Focus • Achieve</Text>
      </View>

      {/* USER CARD */}
      <View style={makeStyles(colors).userCard}>
        <View style={makeStyles(colors).avatar}>
          <Text style={makeStyles(colors).avatarText}>{getInitials(user?.email)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={makeStyles(colors).name}>StudyFlow User</Text>
          <Text style={makeStyles(colors).email} numberOfLines={1}>
            {user?.email || "Not signed in"}
          </Text>
        </View>
      </View>

      {/* STATS */}
      <View style={makeStyles(colors).statsRow}>
        {stats.map((s) => (
          <View key={s.label} style={makeStyles(colors).statCard}>
            <Text style={makeStyles(colors).statValue}>{s.value}</Text>
            <Text style={makeStyles(colors).statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* SETTINGS */}
      <View style={makeStyles(colors).settingsCard}>
        <Text style={makeStyles(colors).settingsTitle}>Settings</Text>

        <View style={makeStyles(colors).settingRow}>
          <Text style={makeStyles(colors).settingLeft}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primarySoft }}
            thumbColor={isDark ? colors.primary : "#ffffff"}
          />
        </View>

        <View style={makeStyles(colors).divider} />

        <View style={makeStyles(colors).settingRow}>
          <Text style={makeStyles(colors).settingLeft}>Focus Durations</Text>
          <Text style={makeStyles(colors).settingRight}>15 / 30 / 45 / 60</Text>
        </View>
      </View>

      {/* LOGOUT */}
      <View style={{ marginTop: "auto" }}>
        <PrimaryButton title="Logout" onPress={logout} />
      </View>
    </View>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingHorizontal: 18,
      paddingTop: 72,
      paddingBottom: 18,
      gap: 12,
    },

    top: { alignItems: "center", gap: 6, marginBottom: 4 },
    logo: { width: 110, height: 110 },
    brand: { color: colors.primary, fontSize: 28, fontWeight: "900" },
    tagline: { color: colors.muted, fontWeight: "800" },

    userCard: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 18,
      backgroundColor: colors.primarySoft,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: { color: colors.primary, fontWeight: "900", fontSize: 18 },
    name: { color: colors.text, fontWeight: "900", fontSize: 16 },
    email: { color: colors.muted, fontWeight: "700", marginTop: 4 },

    statsRow: { flexDirection: "row", gap: 10 },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      alignItems: "center",
    },
    statValue: { color: colors.primary, fontWeight: "900", fontSize: 18 },
    statLabel: { color: colors.muted, fontWeight: "800", marginTop: 4, fontSize: 12, textAlign: "center" },

    settingsCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      gap: 10,
    },
    settingsTitle: { color: colors.text, fontWeight: "900", fontSize: 16 },
    settingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    settingLeft: { color: colors.muted, fontWeight: "800" },
    settingRight: { color: colors.primary, fontWeight: "900" },
    divider: { height: 1, backgroundColor: colors.border, opacity: 0.9 },
  });
