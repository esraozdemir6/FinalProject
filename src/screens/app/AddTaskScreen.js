import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { colors } from "../../theme/colors";
import { useThemeStore } from "../../store/themeStore";
import PrimaryButton from "../../components/PrimaryButton";

export default function AddTaskScreen({ navigation, route }) {
  const onAdd = route?.params?.onAdd;

  const isDark = useThemeStore((s) => s.isDark);
  const dark = {
    bg: "#0E0C14",
    card: "#0B0B10",
    card2: "#1E1B2E",
    border: "#2C2842",
    text: "#F5F4FA",
    muted: "#A8A4C2",
  };

  const [title, setTitle] = React.useState("");
  const [due, setDue] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const save = () => {
    if (!title.trim()) {
      Alert.alert("Missing info", "Please enter a task title.");
      return;
    }

    onAdd?.({
      title: title.trim(),
      dueLabel: due.trim() || "—",
      desc: desc.trim(),
    });

    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? dark.bg : colors.bg }]}>
      <Text style={[styles.title, { color: isDark ? dark.text : colors.text }]}>Add Task</Text>
      <Text style={[styles.sub, { color: isDark ? dark.muted : colors.muted }]}>
        Create a new task
      </Text>

      <Text style={[styles.label, { color: isDark ? dark.muted : colors.muted }]}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Study for midterm"
        placeholderTextColor={isDark ? dark.muted : colors.muted}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? dark.card : colors.card,
            borderColor: isDark ? dark.border : colors.border,
            color: isDark ? dark.text : colors.text,
          },
        ]}
      />

      <Text style={[styles.label, { color: isDark ? dark.muted : colors.muted }]}>Due</Text>
      <TextInput
        value={due}
        onChangeText={setDue}
        placeholder="e.g. tomorrow"
        placeholderTextColor={isDark ? dark.muted : colors.muted}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? dark.card : colors.card,
            borderColor: isDark ? dark.border : colors.border,
            color: isDark ? dark.text : colors.text,
          },
        ]}
      />

      <Text style={[styles.label, { color: isDark ? dark.muted : colors.muted }]}>Description</Text>
      <TextInput
        value={desc}
        onChangeText={setDesc}
        placeholder="Short details..."
        placeholderTextColor={isDark ? dark.muted : colors.muted}
        style={[
          styles.input,
          styles.textArea,
          {
            backgroundColor: isDark ? dark.card : colors.card,
            borderColor: isDark ? dark.border : colors.border,
            color: isDark ? dark.text : colors.text,
          },
        ]}
        multiline
      />

      <View style={{ height: 16 }} />
      <PrimaryButton title="Save" onPress={save} />
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
    paddingTop: 60,
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
  textArea: { height: 90, textAlignVertical: "top" },
});
