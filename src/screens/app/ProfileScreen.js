import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { useAuthStore } from "../../store/authStore";
import PrimaryButton from "../../components/PrimaryButton";

function getInitials(email = "") {
  const namePart = email.split("@")[0] || "User";
  const parts = namePart.replace(/[._-]/g, " ").split(" ").filter(Boolean);
  const first = (parts[0]?.[0] || "U").toUpperCase();
  const second = (parts[1]?.[0] || parts[0]?.[1] || "").toUpperCase();
  return `${first}${second}`.trim();
}

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  // Later (Firestore) we will replace these with real stats
  const stats = [
    { label: "Tasks Today", value: "—" },
    { label: "Sessions", value: "—" },
    { label: "Focus Minutes", value: "—" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* User card */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(user?.email)}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>StudyFlow User</Text>
          <Text style={styles.email}>{user?.email || "Not signed in"}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {stats.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Settings (UI only for now) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLeft}>Focus Duration</Text>
          <Text style={styles.settingRight}>15 / 30 / 45 / 60</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <Text style={styles.settingLeft}>Theme</Text>
          <Text style={styles.settingRight}>Lilac</Text>
        </View>
      </View>

      {/* Logout */}
      <View style={{ marginTop: "auto" }}>
        <PrimaryButton title="Logout" onPress={logout} />
        <View style={{ height: 10 }} />
        <Text style={styles.hint}>
          Next: connect Firebase Auth + Firestore to show real stats.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 18,
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
  },

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
  avatarText: {
    color: colors.primary,
    fontWeight: "900",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  name: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 16,
  },
  email: {
    color: colors.muted,
    fontWeight: "700",
    marginTop: 4,
  },

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
  statLabel: { color: colors.muted, fontWeight: "700", marginTop: 4, fontSize: 12, textAlign: "center" },

  section: {
    backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 10,
  },
  sectionTitle: { color: colors.text, fontWeight: "900", fontSize: 16 },
  settingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  settingLeft: { color: colors.muted, fontWeight: "800" },
  settingRight: { color: colors.primary, fontWeight: "900" },
  divider: { height: 1, backgroundColor: colors.border, opacity: 0.9 },

  hint: { color: colors.muted, fontWeight: "700", textAlign: "center", marginTop: 8 },
});
