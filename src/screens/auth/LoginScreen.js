import React from "react";
import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Alert,
} from "react-native";
import { colors } from "../../theme/colors";
import { useAuthStore } from "../../store/authStore";
import PrimaryButton from "../../components/PrimaryButton";

export default function LoginScreen({ navigation }) {
  const { login } = useAuthStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailTouched, setEmailTouched] = React.useState(false);

  const isEmailValid = React.useMemo(() => {
    const v = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const emailError = React.useMemo(() => {
    if (!emailTouched) return "";
    if (!email.trim()) return "Email is required.";
    if (!isEmailValid) return "Please enter a valid email address. (e.g. email@example.com)";
    return "";
  }, [emailTouched, email, isEmailValid]);

  const handleLogin = () => {
    setEmailTouched(true);

    if (!email.trim()) {
      Alert.alert("Hata", "Email is required.");
      return;
    }

    if (!isEmailValid) {
      Alert.alert("Hata", "Please enter a valid email address. (e.g. email@example.com)");
      return;
    }

    login(email.trim(), password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
      >
        {/*  ScrollView */}
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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
              style={[
                styles.input,
                emailTouched && !isEmailValid ? styles.inputError : null,
              ]}
              value={email}
              onChangeText={(t) => {
                setEmail(t);
              }}
              onBlur={() => setEmailTouched(true)}
              placeholder="email@example.com"
              placeholderTextColor={colors.muted}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              returnKeyType="next"
            />

            {/* inline error text  */}
            {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.muted}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <View style={{ height: 16 }} />
            <PrimaryButton title="Login" onPress={handleLogin} />
            <View style={{ height: 10 }} />
            <PrimaryButton
              title="Create account"
              variant="ghost"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
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

  inputError: {
    borderColor: "#E5484D",
  },
  errorText: {
    marginTop: 8,
    color: "#E5484D",
    fontWeight: "700",
  },
});
