import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { colors } from "../../theme/colors";
import PrimaryButton from "../../components/PrimaryButton";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [due, setDue] = React.useState("");
  const [desc, setDesc] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>
      <Text style={styles.sub}>Create a new task</Text>

      {/* Title */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Study for midterm"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      {/* Due */}
      <Text style={styles.label}>Due</Text>
      <TextInput
        value={due}
        onChangeText={setDue}
        placeholder="e.g. tomorrow"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      {/* Description */}
      <Text style={styles.label}>Description </Text>
      <TextInput
        value={desc}
        onChangeText={setDesc}
        placeholder="Short details..."
        placeholderTextColor={colors.muted}
        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
        multiline
      />

      <View style={{ height: 16 }} />
      <PrimaryButton title="Save " onPress={() => navigation.goBack()} />
      <View style={{ height: 10 }} />
      <PrimaryButton title="Cancel" variant="ghost" onPress={() => navigation.goBack()} />
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
    gap: 6,
  },
  title: { color: colors.text, fontSize: 30, fontWeight: "900" },
  sub: { color: colors.muted, fontWeight: "700", marginTop: -2, marginBottom: 10 },
  label: { color: colors.muted, fontWeight: "800", marginTop: 10, marginBottom: 6 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 12,
    color: colors.text,
    fontWeight: "700",
  },
});
