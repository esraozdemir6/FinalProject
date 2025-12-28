import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { useAuthStore } from "../../store/authStore";
import PrimaryButton from "../../components/PrimaryButton";

export default function RegisterScreen({ navigation }) {
  const { register } = useAuthStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.sub}>Start organizing your study life</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email@example.com"
          placeholderTextColor={colors.muted}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor={colors.muted}
          secureTextEntry
        />

        <View style={{ height: 16 }} />
        <PrimaryButton title="Register" onPress={() => register(email, password)} />
        <View style={{ height: 10 }} />
        <PrimaryButton title="Back to login" variant="ghost" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 18, justifyContent: "center" },
  card: { backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontSize: 22, fontWeight: "900" },
  sub: { color: colors.muted, marginTop: 6, marginBottom: 12, fontWeight: "600" },

  label: { color: colors.muted, fontWeight: "700", marginTop: 10, marginBottom: 6 },
  input: {
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    borderRadius: 16,
    color: colors.text,
  },
});
