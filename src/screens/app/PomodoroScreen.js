import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../../theme/colors";

function formatMMSS(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function PomodoroScreen() {
  const total = 25 * 60;
  const [secondsLeft, setSecondsLeft] = React.useState(total);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setSecondsLeft((p) => (p > 0 ? p - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  const reset = () => {
    setRunning(false);
    setSecondsLeft(total);
  };

  // circle sizing
  const { width } = Dimensions.get("window");
  const size = Math.min(width - 60, 340);
  const radius = size / 2 - 18;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;

  const progress = secondsLeft / Math.max(1, total);
  const dashOffset = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro</Text>

      <View style={styles.card}>
        <View style={{ width: size, height: size }}>
          <Svg width={size} height={size}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.border}
              strokeWidth={stroke}
              fill="transparent"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.primary}
              strokeWidth={stroke}
              fill="transparent"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${size / 2}, ${size / 2}`}
            />
          </Svg>

          <View style={styles.center}>
            <Text style={styles.time}>{formatMMSS(secondsLeft)}</Text>
            <Text style={styles.label}>Time left</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Pressable
            onPress={() => setRunning((p) => !p)}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
            ]}
          >
            <Text style={styles.primaryText}>{running ? "Pause" : "Start"}</Text>
          </Pressable>

          <Pressable
            onPress={reset}
            style={({ pressed }) => [
              styles.ghostBtn,
              pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
            ]}
          >
            <Text style={styles.ghostText}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 18, gap: 12 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900" },

  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  center: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
  time: { color: colors.text, fontSize: 54, fontWeight: "900", letterSpacing: 1 },
  label: { color: colors.muted, fontWeight: "800", marginTop: 6 },

  row: { flexDirection: "row", gap: 10, width: "100%" },
  primaryBtn: { flex: 1, backgroundColor: colors.primary, borderRadius: 18, paddingVertical: 14, alignItems: "center" },
  primaryText: { color: "white", fontWeight: "900", fontSize: 15 },
  ghostBtn: { flex: 1, backgroundColor: colors.card2, borderWidth: 1, borderColor: colors.border, borderRadius: 18, paddingVertical: 14, alignItems: "center" },
  ghostText: { color: colors.primary, fontWeight: "900", fontSize: 15 },
});
