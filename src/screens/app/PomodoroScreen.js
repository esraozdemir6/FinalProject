import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../../theme/colors";
import { useThemeStore } from "../../store/themeStore";

const DURATIONS_MIN = [15, 30, 45, 60];

function formatMMSS(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function PomodoroScreen() {
  const isDark = useThemeStore((s) => s.isDark);

  const dark = {
    bg: "#0E0C14",
    card: "#171523",
    card2: "#1E1B2E",
    text: "#F5F4FA",
    muted: "#A8A4C2",
    border: "#2C2842",
  };

  const [focusMin, setFocusMin] = React.useState(30);
  const focusTotalSeconds = focusMin * 60;

  const [mode, setMode] = React.useState("focus"); 
  const [running, setRunning] = React.useState(false);

  const [focusLeft, setFocusLeft] = React.useState(focusTotalSeconds);
  const [breakElapsed, setBreakElapsed] = React.useState(0);

  const [sessions, setSessions] = React.useState([]);

  React.useEffect(() => {
    if (!running) return;

    const t = setInterval(() => {
      if (mode === "focus") {
        setFocusLeft((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setBreakElapsed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(t);
  }, [running, mode]);

  React.useEffect(() => {
    if (mode !== "focus") return;
    if (focusLeft !== 0) return;

    // ✅ Save completed focus session
    setSessions((prev) => [
      {
        id: Date.now().toString(),
        minutes: focusMin,
        completedAt: new Date().toLocaleString(),
      },
      ...prev,
    ]);

    setRunning(false);
    setMode("break");
    setBreakElapsed(0);
  }, [focusLeft, mode, focusMin]);

  const startPause = () => setRunning((p) => !p);

  const reset = () => {
    setRunning(false);
    if (mode === "focus") setFocusLeft(focusTotalSeconds);
    else setBreakElapsed(0);
  };

  const switchTo = (nextMode) => {
    setRunning(false);
    setMode(nextMode);
    if (nextMode === "focus") setFocusLeft(focusTotalSeconds);
    else setBreakElapsed(0);
  };

  const selectDuration = (m) => {
    setRunning(false);
    setFocusMin(m);
    setFocusLeft(m * 60);
  };

  const { width } = Dimensions.get("window");
  const size = Math.min(width - 60, 360);
  const radius = size / 2 - 18;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;

  const progress = mode === "focus" ? focusLeft / Math.max(1, focusTotalSeconds) : 1;
  const dashOffset = circumference * (1 - progress);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? dark.bg : colors.bg }]}>
      <Text style={[styles.title, { color: isDark ? dark.text : colors.text }]}>Pomodoro</Text>

      {/* Mode pills */}
      <View style={styles.modeRow}>
        <Pressable
          onPress={() => switchTo("focus")}
          style={({ pressed }) => [
            styles.modePill,
            {
              backgroundColor: isDark ? dark.card : colors.card,
              borderColor: isDark ? dark.border : colors.border,
            },
            mode === "focus" && styles.modePillActive,
            pressed && { opacity: 0.92 },
          ]}
        >
          <Text
            style={[
              styles.modeText,
              { color: isDark ? dark.muted : colors.muted },
              mode === "focus" && styles.modeTextActive,
            ]}
          >
            Focus
          </Text>
        </Pressable>

        <Pressable
          onPress={() => switchTo("break")}
          style={({ pressed }) => [
            styles.modePill,
            {
              backgroundColor: isDark ? dark.card : colors.card,
              borderColor: isDark ? dark.border : colors.border,
            },
            mode === "break" && styles.modePillActive,
            pressed && { opacity: 0.92 },
          ]}
        >
          <Text
            style={[
              styles.modeText,
              { color: isDark ? dark.muted : colors.muted },
              mode === "break" && styles.modeTextActive,
            ]}
          >
            Break (Stopwatch)
          </Text>
        </Pressable>
      </View>

      {/* Duration selector (Focus only) */}
      {mode === "focus" && (
        <View style={styles.durationRow}>
          {DURATIONS_MIN.map((m) => {
            const active = focusMin === m;
            const disabled = running;
            return (
              <Pressable
                key={m}
                disabled={disabled}
                onPress={() => selectDuration(m)}
                style={({ pressed }) => [
                  styles.durationChip,
                  {
                    backgroundColor: isDark ? dark.card : colors.card,
                    borderColor: isDark ? dark.border : colors.border,
                  },
                  active && styles.durationChipActive,
                  disabled && { opacity: 0.45 },
                  pressed && !disabled && { opacity: 0.92 },
                ]}
              >
                <Text
                  style={[
                    styles.durationText,
                    { color: isDark ? dark.muted : colors.muted },
                    active && styles.durationTextActive,
                  ]}
                >
                  {m}m
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {/* Big circle card */}
      <View
        style={[
          styles.circleCard,
          {
            backgroundColor: isDark ? dark.card : colors.card,
            borderColor: isDark ? dark.border : colors.border,
          },
        ]}
      >
        <View style={{ width: size, height: size }}>
          <Svg width={size} height={size}>
            {/* track */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={isDark ? dark.border : colors.border}
              strokeWidth={stroke}
              fill="transparent"
            />
            {/* progress only in focus */}
            {mode === "focus" && (
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
            )}
          </Svg>

          <View style={styles.centerText}>
            <Text style={[styles.bigTime, { color: isDark ? dark.text : colors.text }]}>
              {mode === "focus" ? formatMMSS(focusLeft) : formatMMSS(breakElapsed)}
            </Text>
            <Text style={[styles.smallLabel, { color: isDark ? dark.muted : colors.muted }]}>
              {mode === "focus" ? "Time left" : "Stopwatch"}
            </Text>
            <Text style={styles.miniHint}>{mode === "focus" ? "Stay focused ✨" : "Breathe ☁️"}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsRow}>
          <Pressable
            onPress={startPause}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
            ]}
          >
            <Text style={styles.primaryBtnText}>{running ? "Pause" : "Start"}</Text>
          </Pressable>

          <Pressable
            onPress={reset}
            style={({ pressed }) => [
              styles.ghostBtn,
              {
                backgroundColor: isDark ? dark.card2 : colors.card2,
                borderColor: isDark ? dark.border : colors.border,
              },
              pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
            ]}
          >
            <Text style={styles.ghostBtnText}>Reset</Text>
          </Pressable>
        </View>
      </View>

      {/* ✅ Saved sessions (preview) */}
      <View
        style={[
          styles.noteBox,
          {
            backgroundColor: isDark ? dark.card2 : colors.card2,
            borderColor: isDark ? dark.border : colors.border,
          },
        ]}
      >
        <Text style={[styles.noteTitle, { color: isDark ? dark.text : colors.text }]}>
          Saved Focus Sessions
        </Text>

        {sessions.length === 0 ? (
          <Text style={[styles.noteText, { color: isDark ? dark.muted : colors.muted }]}>
            No sessions yet. Complete a focus timer to save one.
          </Text>
        ) : (
          sessions.slice(0, 4).map((s) => (
            <Text
              key={s.id}
              style={[styles.noteText, { color: isDark ? dark.muted : colors.muted }]}
            >
              • {s.minutes} min — {s.completedAt}
            </Text>
          ))
        )}
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
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 2,
  },

  modeRow: { flexDirection: "row", gap: 10 },
  modePill: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  modePillActive: { backgroundColor: colors.primarySoft, borderColor: colors.accent },
  modeText: { color: colors.muted, fontWeight: "900", fontSize: 12 },
  modeTextActive: { color: colors.primary },

  durationRow: { flexDirection: "row", gap: 10 },
  durationChip: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 10,
    alignItems: "center",
  },
  durationChipActive: { backgroundColor: colors.card2, borderColor: colors.accent },
  durationText: { color: colors.muted, fontWeight: "900" },
  durationTextActive: { color: colors.primary },

  circleCard: {
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

  centerText: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bigTime: { color: colors.text, fontSize: 54, fontWeight: "900", letterSpacing: 1 },
  smallLabel: { color: colors.muted, fontWeight: "800", marginTop: 6 },
  miniHint: { color: colors.primary, fontWeight: "900", marginTop: 10 },

  controlsRow: { flexDirection: "row", gap: 10, width: "100%" },
  primaryBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryBtnText: { color: "white", fontWeight: "900", fontSize: 15 },

  ghostBtn: {
    flex: 1,
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  ghostBtnText: { color: colors.primary, fontWeight: "900", fontSize: 15 },

  noteBox: {
    backgroundColor: colors.card2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 12,
    gap: 6,
  },
  noteTitle: { fontWeight: "900", fontSize: 13 },
  noteText: { fontWeight: "700", lineHeight: 18 },
});
