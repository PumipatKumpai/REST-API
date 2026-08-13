import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#F5F7FF",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="addPhone" />
      <Stack.Screen name="editPhone" />
    </Stack>
  );
}
