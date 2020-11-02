import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "../../components/AppHeader/AppHeader";
import Todoform from "../../components/TodoForm/TodoForm";
import TodoListItem from "../../components/TodoList/TodoList";
import { TodoProvider } from "../../context/todoContext";

export default function TodosScreen(props) {
    return (
        <TodoProvider>
            <LinearGradient
                colors={["#380036", "#0CBABA"]}
                style={styles.container}
            >
                <AppHeader />
                <Todoform />
                <TodoListItem />


            </LinearGradient>
        </TodoProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff",
        alignItems: "stretch",
        justifyContent: "space-between",
    },
});

