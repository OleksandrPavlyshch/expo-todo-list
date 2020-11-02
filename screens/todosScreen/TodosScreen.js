import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "../../components/AppHeader/AppHeader";
import Todoform from "../../components/TodoForm/TodoForm";

export default function TodosScreen(props) {
    return (
        <LinearGradient
            colors={["#380036", "#0CBABA"]}
            style={styles.container}
        >
            <AppHeader />
            <Todoform />

            {/* <View style={styles.container}>
                <Text>Todosscreen</Text>
            </View> */}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff",
        alignItems: "stretch",
        // justifyContent: "space-between",
    },
});

