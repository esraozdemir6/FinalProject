import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { colors } from "../../theme/colors";
import { useThemeStore } from "../../store/themeStore";
import SummaryCard from "../../components/SummaryCard";
import QuoteCard from "../../components/QuoteCard";
import NoteCard from "../../components/NoteCard";

function todayLabel() {
  const d = new Date();
  return d.toLocaleDateString();
}

export default function DashboardScreen({ navigation }) {
  const isDark = useThemeStore((s) => s.isDark);

  const dark = {
    bg: "#0E0C14",
    card: "#171523",
    card2: "#1E1B2E",
    text: "#F5F4FA",
    muted: "#A8A4C2",
    border: "#2C2842",
  };

  const fake = {
    tasksToday: 3,
    completedWeek: 7,
    focusMinutesToday: 4.35,
    quote: "Small steps every day lead to big results.",
    author: "StudyFlow",
  };

  const [notes, setNotes] = React.useState([
    {
      id: "n1",
      course: "Mobile Programming",
      text:
        "What is State? State in mobile programming refers to data that can change while the application is running and directly affects what is displayed on the user interface.",
      dateLabel: todayLabel(),
    },
     {
    id: "n2",
    course: "Software Engineering",
    text:
      "Agile is an iterative development approach that emphasizes flexibility, collaboration, and customer feedback.",
    dateLabel: todayLabel(),
  },
  {
    id: "n3",
    course: "Artificial Intelligence",
    text:
      "Machine learning is a subset of artificial intelligence that enables systems to learn from data and improve performance without being explicitly programmed.",
    dateLabel: todayLabel(),
  },
  {
    id: "n4",
    course: "Data Structures",
    text:
      "Stacks and queues are fundamental data structures used to manage and organize data efficiently based on LIFO and FIFO principles.",
    dateLabel: todayLabel(),
  },
  ]);

  const addNote = ({ course, text }) => {
    const id = `n${Date.now()}`;
    setNotes((prev) => [{ id, course, text, dateLabel: todayLabel() }, ...prev]);
  };

  const deleteNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <View style={[styles.container, { backgroundColor: isDark ? dark.bg : colors.bg }]}>
      <Text style={[styles.title, { color: isDark ? dark.text : colors.text }]}>Dashboard</Text>
      <Text style={[styles.sub, { color: isDark ? dark.muted : colors.muted }]}>
        Your study overview for today
      </Text>

      <View style={styles.row}>
        <SummaryCard label="Tasks Today" value={fake.tasksToday} helper="Plan your day" />
        <SummaryCard label="Completed This Week" value={fake.completedWeek} helper="Keep going" />
      </View>

      <View style={styles.row}>
        <SummaryCard
          label="Focus Hours Today"
          value={fake.focusMinutesToday}
          helper="Pomodoro sessions"
        />
        <SummaryCard label="Streak" value={"—"} helper="Next phase" />
      </View>

      <QuoteCard quote={fake.quote} author={fake.author} />

      {/* Study Notes header */}
      <View style={styles.notesHeader}>
        <Text style={[styles.notesTitle, { color: isDark ? dark.text : colors.text }]}>Study Notes</Text>

        <Pressable
          onPress={() => navigation.navigate("AddNote", { onAdd: addNote })}
          style={({ pressed }) => [
            styles.notesBtn,
            {
              backgroundColor: isDark ? dark.card2 : colors.primarySoft,
              borderColor: isDark ? dark.border : colors.border,
            },
            pressed && { opacity: 0.9 },
          ]}
        >
          <Text style={styles.notesBtnText}>＋ Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteCard note={item} onDelete={deleteNote} />}
        contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
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
              No notes yet
            </Text>
            <Text style={[styles.emptySub, { color: isDark ? dark.muted : colors.muted }]}>
              Add your first course note.
            </Text>
          </View>
        }
      />
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
    gap: 10,
  },
  title: { color: colors.text, fontSize: 30, fontWeight: "900" },
  sub: { color: colors.muted, fontWeight: "700", marginTop: -2, marginBottom: 8 },

  row: { flexDirection: "row", gap: 10 },

  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  notesTitle: { color: colors.text, fontWeight: "900", fontSize: 16 },
  notesBtn: {
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  notesBtnText: { color: colors.primary, fontWeight: "900" },

  empty: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
  },
  emptyTitle: { color: colors.text, fontWeight: "900" },
  emptySub: { color: colors.muted, fontWeight: "700", marginTop: 6, textAlign: "center" },

  hint: { marginTop: 8, color: colors.muted, fontWeight: "700", textAlign: "center" },
});
