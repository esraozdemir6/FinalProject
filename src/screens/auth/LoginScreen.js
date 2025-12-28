import React from "react";
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView } from "react-native";
import { colors } from "../../theme/colors";
import { useAuthStore } from "../../store/authStore";
import PrimaryButton from "../../components/PrimaryButton";

export default function LoginScreen({ navigation }) {
  const { login } = useAuthStore();
  const [email, setEmail] = React.useState("test@mail.com");
  const [password, setPassword] = React.useState("123456");

  return (
    <View style={styles.container}>
      {/* Top brand area */}
      <View style={styles.brandWrap}>
        <Text style={styles.brandTitle}>StudyFlow</Text>
        <Text style={styles.brandTagline}>Plan. Focus. Achieve.</Text>

        <View style={styles.logoWrap}>
          <Image
            source={require("../../../assets/bear.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Sign in card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sign in</Text>
        <Text style={styles.cardSub}>Welcome back — let’s get things done ✨</Text>

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
        <PrimaryButton title="Login" onPress={() => login(email, password)} />
        <View style={{ height: 10 }} />
        <PrimaryButton
          title="Create account"
          variant="ghost"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 18,
    paddingBottom: 18,
    paddingTop: 126,
  },

  brandWrap: {
    alignItems: "center",
    marginBottom: 14,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: colors.primary,
    letterSpacing: 0.4,
  },
  brandTagline: {
    marginTop: 6,
    color: colors.muted,
    fontWeight: "700",
  },

  logoWrap: {
    marginTop: 14,
    width: 140,
    height: 140,
    borderRadius: 28,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },

  card: {
    marginTop: 6,
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
  cardSub: {
    color: colors.muted,
    marginTop: 6,
    marginBottom: 14,
    fontWeight: "600",
  },

  label: {
    color: colors.muted,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    borderRadius: 16,
    color: colors.text,
  },
});
