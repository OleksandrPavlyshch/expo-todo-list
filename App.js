import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { decode, encode } from "base-64";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import { TodoProvider } from "./context/todoContext";

import ScreenNavigations from "./navigations/ScreenNavigations";

if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <>
            <LinearGradient
                colors={["#380036", "#0CBABA"]}
                style={styles.container}
            >
                <TodoProvider>
                    <ScreenNavigations />
                    <StatusBar style="light" />
                </TodoProvider>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "stretch",
        justifyContent: "space-between",
    }
});
