import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppTabs from "./AppTabs";
import AddTaskScreen from "../screens/app/AddTaskScreen";
import AddNoteScreen from "../screens/app/AddNoteScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      {/* Bottom Tabs */}
      <Stack.Screen
        name="Tabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />

      {/* Add Task */}
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ headerShown: false }}
      />

      {/* Add Study Note*/}
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
