import React from "react";
import { View, Text, StyleSheet, Image, Switch, Pressable, Modal, FlatList,} from "react-native";
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

  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const stats = [
    { label: "Tasks Today", value: "6" },
    { label: "Sessions", value: "3" },
    { label: "Focus Hours", value: "4.35" },
  ];

  const ICONS = React.useMemo(
    () => ["🐻", "🎯", "📚", "✨", "🧠", "🔥", "✅", "⏳", "🌿", "💻", "📈", "📝"],
    []
  );
  const [selectedIcon, setSelectedIcon] = React.useState("🐻");
  const [iconModalOpen, setIconModalOpen] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* TOP LOGO AREA */}
      <View style={styles.top}>
        <Image
          source={require("../../../assets/bear.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brand}>StudyFlow</Text>
        <Text style={styles.tagline}>Plan • Focus • Achieve</Text>
      </View>

      {/* USER CARD */}
      <View style={styles.userCard}>
        {/* Pressable avatar  */}
        <Pressable
          onPress={() => setIconModalOpen(true)}
          style={styles.avatar}
          hitSlop={10}
        >
        <Pressable
          onPress={() => setIconModalOpen(true)}
          style={styles.avatar}
          hitSlop={10}
>
  <Text style={styles.avatarIcon}>{selectedIcon}</Text>
</Pressable>

        </Pressable>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>StudyFlow User</Text>
          <Text style={styles.email} numberOfLines={1}>
            {user?.email || "Not signed in"}
          </Text>
        </View>
      </View>

      {/* Icon Picker Modal */}
      <Modal
        visible={iconModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIconModalOpen(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setIconModalOpen(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Choose an icon</Text>
            <Text style={styles.modalSub}>Tap to select</Text>

            <FlatList
              data={ICONS}
              keyExtractor={(item) => item}
              numColumns={4}
              contentContainerStyle={styles.iconGrid}
              renderItem={({ item }) => {
                const active = item === selectedIcon;
                return (
                  <Pressable
                    onPress={() => {
                      setSelectedIcon(item);
                      setIconModalOpen(false);
                    }}
                    style={[styles.iconItem, active ? styles.iconItemActive : null]}
                  >
                    <Text style={styles.iconItemText}>{item}</Text>
                  </Pressable>
                );
              }}
            />

            <View style={{ height: 10 }} />
            <PrimaryButton title="Close" variant="ghost" onPress={() => setIconModalOpen(false)} />
          </Pressable>
        </Pressable>
      </Modal>

      {/* STATS */}
      <View style={styles.statsRow}>
        {stats.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* SETTINGS */}
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Settings</Text>

        <View style={styles.settingRow}>
          <Text style={styles.settingLeft}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primarySoft }}
            thumbColor={isDark ? colors.primary : "#ffffff"}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <Text style={styles.settingLeft}>Focus Durations</Text>
          <Text style={styles.settingRight}>15 / 30 / 45 / 60</Text>
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
    avatarIcon: {
  fontSize: 30,
},
    avatarText: { color: colors.primary, fontWeight: "900", fontSize: 18 },

    iconBadge: {
      position: "absolute",
      right: -6,
      bottom: -6,
      width: 26,
      height: 26,
      borderRadius: 10,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    iconBadgeText: { fontSize: 14 },

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
    statLabel: {
      color: colors.muted,
      fontWeight: "800",
      marginTop: 4,
      fontSize: 12,
      textAlign: "center",
    },

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

    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
      padding: 18,
      justifyContent: "center",
    },
    modalCard: {
      backgroundColor: colors.card,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
    },
    modalTitle: { color: colors.text, fontWeight: "900", fontSize: 16 },
    modalSub: { color: colors.muted, fontWeight: "700", marginTop: 6, marginBottom: 10 },

    iconGrid: { gap: 10 },
    iconItem: {
      flex: 1,
      margin: 6,
      height: 54,
      borderRadius: 18,
      backgroundColor: colors.card2,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    iconItemActive: {
      borderColor: colors.primary,
    },
    iconItemText: { fontSize: 22 },
  });
