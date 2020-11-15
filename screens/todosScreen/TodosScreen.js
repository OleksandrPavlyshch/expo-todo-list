import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Todoform from "../../components/TodoForm/TodoForm";
import TodoListItem from "../../components/TodoList/TodoList";
import AppHeader from "../../components/AppHeader/AppHeader";

export default function TodosScreen(props) {
    return (
        <LinearGradient
            colors={["#380036", "#0CBABA"]}
            style={styles.container}
        >
            <Todoform />
            <TodoListItem />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "stretch",
        justifyContent: "space-between",
    },
});
