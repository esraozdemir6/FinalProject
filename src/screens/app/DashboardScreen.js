import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { colors } from "../../theme/colors";
import SummaryCard from "../../components/SummaryCard";
import QuoteCard from "../../components/QuoteCard";
import NoteCard from "../../components/NoteCard";

function todayLabel() {
  const d = new Date();
  return d.toLocaleDateString();
}

export default function DashboardScreen({ navigation }) {
  const fake = {
    tasksToday: 3,
    completedWeek: 7,
    focusMinutesToday: 45,
    quote: "Small steps every day lead to big results.",
    author: "StudyFlow",
  };

  const [notes, setNotes] = React.useState([
    { id: "n1", course: "Mobile Programming", text: "What is State? State in mobile programming refers to data that can change while the application is running and directly affects what is displayed on the user interface. ", dateLabel: todayLabel() },
  ]);

  const addNote = ({ course, text }) => {
    const id = `n${Date.now()}`;
    setNotes((prev) => [{ id, course, text, dateLabel: todayLabel() }, ...prev]);
  };

  const deleteNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.sub}>Your study overview for today</Text>

      <View style={styles.row}>
        <SummaryCard label="Tasks Today" value={fake.tasksToday} helper="Plan your day" />
        <SummaryCard label="Completed This Week" value={fake.completedWeek} helper="Keep going" />
      </View>

      <View style={styles.row}>
        <SummaryCard label="Focus Minutes Today" value={fake.focusMinutesToday} helper="Pomodoro sessions" />
        <SummaryCard label="Streak" value={"—"} helper="Next phase" />
      </View>

      <QuoteCard quote={fake.quote} author={fake.author} />

      {/* Study Notes header */}
      <View style={styles.notesHeader}>
        <Text style={styles.notesTitle}>Study Notes</Text>
        <Pressable
          onPress={() => navigation.navigate("AddNote", { onAdd: addNote })}
          style={({ pressed }) => [styles.notesBtn, pressed && { opacity: 0.9 }]}
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
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No notes yet</Text>
            <Text style={styles.emptySub}>Add your first course note.</Text>
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
