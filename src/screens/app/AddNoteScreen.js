import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { colors } from "../../theme/colors";
import PrimaryButton from "../../components/PrimaryButton";

export default function AddNoteScreen({ navigation, route }) {
  const onAdd = route?.params?.onAdd;

  const [course, setCourse] = React.useState("");
  const [text, setText] = React.useState("");

  const save = () => {
    if (!course.trim() || !text.trim()) {
      Alert.alert("Missing info", "Please enter course name and your note.");
      return;
    }
    onAdd?.({
      course: course.trim(),
      text: text.trim(),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Note</Text>
      <Text style={styles.sub}>Write your course note</Text>

      <Text style={styles.label}>Course</Text>
      <TextInput
        value={course}
        onChangeText={setCourse}
        placeholder="e.g., Mobile Programming"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      <Text style={styles.label}>Note</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Write your study note..."
        placeholderTextColor={colors.muted}
        style={[styles.input, styles.textArea]}
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
  textArea: { height: 140, textAlignVertical: "top" },
});
