import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useThemeStore } from "../store/themeStore";

import DashboardScreen from "../screens/app/DashboardScreen";
import TasksScreen from "../screens/app/TasksScreen";
import PomodoroScreen from "../screens/app/PomodoroScreen";
import ProfileScreen from "../screens/app/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const isDark = useThemeStore((s) => s.isDark);

  const dark = {
    bg: "#0B0B10",      
    border: "#2C2842",
    active: colors.primary,
    inactive: "#8E88B8",
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: isDark ? dark.bg : colors.card,
          borderTopColor: isDark ? dark.border : colors.border,
          height: 62,
          paddingBottom: 8,
        },

        tabBarActiveTintColor: isDark ? dark.active : colors.primary,
        tabBarInactiveTintColor: isDark ? dark.inactive : colors.muted,

        tabBarIcon: ({ focused, color, size }) => {
          const map = {
            Dashboard: focused ? "grid" : "grid-outline",
            Tasks: focused ? "list" : "list-outline",
            Pomodoro: focused ? "timer" : "timer-outline",
            Profile: focused ? "person" : "person-outline",
          };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Pomodoro" component={PomodoroScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
