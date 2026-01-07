import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { colors } from "../../theme/colors";
import { useThemeStore } from "../../store/themeStore";
import TaskCard from "../../components/TaskCard";

const FILTERS = ["Tasks", "Completed"];

const INITIAL = [
  { id: "1", title: "Final proposal", dueLabel: "Today", completed: false },
  { id: "2", title: "Take notes for exam", dueLabel: "Today", completed: false },
  { id: "3", title: "Study for Image Processing quiz", dueLabel: "Tomorrow", completed: false },
  { id: "4", title: "Organize week plan", dueLabel: "This week", completed: true },
];

export default function TasksScreen({ navigation }) {
  const isDark = useThemeStore((s) => s.isDark);

  const dark = {
    bg: "#0E0C14",
    card: "#171523",
    card2: "#1E1B2E",
    text: "#F5F4FA",
    muted: "#A8A4C2",
    border: "#2C2842",
  };

  const [filter, setFilter] = React.useState("Tasks");
  const [tasks, setTasks] = React.useState(INITIAL);

  const onToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        return { ...t, completed: !t.completed };
      })
    );
  };

  const visible = React.useMemo(() => {
    if (filter === "Completed") return tasks.filter((t) => t.completed);
    return tasks.filter((t) => !t.completed);
  }, [filter, tasks]);

  const renderItem = ({ item }) => <TaskCard task={item} onToggleComplete={onToggleComplete} />;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? dark.bg : colors.bg }]}>
      <Text style={[styles.title, { color: isDark ? dark.text : colors.text }]}>Tasks</Text>
      <Text style={[styles.sub, { color: isDark ? dark.muted : colors.muted }]}>
        Manage your tasks and deadlines
      </Text>

      {/* Filters */}
      <View style={styles.filtersRow}>
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={({ pressed }) => [
                styles.filterPill,
                {
                  backgroundColor: isDark ? dark.card : colors.card,
                  borderColor: isDark ? dark.border : colors.border,
                },
                active && styles.filterPillActive,
                pressed && { opacity: 0.92 },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: isDark ? dark.muted : colors.muted },
                  active && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* List */}
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10, paddingBottom: 90 }}
        ListEmptyComponent={
          <View
            style={[
              styles.empty,
              {
                backgroundColor: isDark ? dark.card : colors.card,
                borderColor: isDark ? dark.border : colors.border,
              },
            ]}
          >
            <Text style={[styles.emptyTitle, { color: isDark ? dark.text : colors.text }]}>
              No tasks here
            </Text>
            <Text style={[styles.emptySub, { color: isDark ? dark.muted : colors.muted }]}>
              Add a new task to get started.
            </Text>
          </View>
        }
      />

      {/* Floating + button */}
      <Pressable
        onPress={() => navigation.navigate("AddTask")}
        style={({ pressed }) => [
          styles.fab,
          pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
        ]}
      >
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 18,
    gap: 8,
  },
  title: { color: colors.text, fontSize: 30, fontWeight: "900" },
  sub: { color: colors.muted, fontWeight: "700", marginTop: -2, marginBottom: 10 },

  filtersRow: { flexDirection: "row", gap: 10, marginBottom: 8 },
  filterPill: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  filterPillActive: { backgroundColor: colors.primarySoft, borderColor: colors.accent },
  filterText: { color: colors.muted, fontWeight: "900", fontSize: 12 },
  filterTextActive: { color: colors.primary },

  empty: {
    marginTop: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
  },
  emptyTitle: { color: colors.text, fontWeight: "900" },
  emptySub: { color: colors.muted, fontWeight: "700", marginTop: 6, textAlign: "center" },

  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: { color: "white", fontWeight: "900", fontSize: 26, marginTop: -2 },
});
