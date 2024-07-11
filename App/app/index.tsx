// app/index.tsx
import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Redirect, useRouter } from 'expo-router'
import useAuthStore from "../hooks/useZustandStore"

export default function App() {
    return <Redirect href={"/home"} />;
}