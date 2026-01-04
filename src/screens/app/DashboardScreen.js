import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import SummaryCard from "../../components/SummaryCard";
import QuoteCard from "../../components/QuoteCard";
import PrimaryButton from "../../components/PrimaryButton";

export default function DashboardScreen() {
  const fake = {
    tasksToday: 3,
    completedWeek: 7,
    focusMinutesToday: 45,
    quote: "Small steps every day lead to big results.",
    author: "StudyFlow",
  };

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
        <SummaryCard label="Streak" value={"—"}  />
      </View>

      <QuoteCard quote={fake.quote} author={fake.author} />

      <View style={styles.actions}>
        <PrimaryButton title="Start Pomodoro" onPress={() => {}} />
        <View style={{ height: 10 }} />
        <PrimaryButton title="Add Task" variant="ghost" onPress={() => {}} />
      </View>


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

  actions: { marginTop: 6 },
  hint: { marginTop: 8, color: colors.muted, fontWeight: "700", textAlign: "center" },
});
