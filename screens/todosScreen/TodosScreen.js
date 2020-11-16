import React from "react";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TodoForm from "../../components/TodoForm/TodoForm";
import TodoListItem from "../../components/TodoList/TodoList";
import { Icon, Button } from "react-native-elements";
import { useTodo } from "../../context/todoContext";

export default function TodosScreen({ navigation }) {
    const { isMobile } = useTodo();
    navigation.setOptions({
        headerRight: () => (
            <Button
                icon={
                    <Icon
                        size={24}
                        name="account-circle"
                        type="material"
                        color="white"
                    />
                }
                iconRight
                type="clear"
                onPress={() => navigation.navigate("USER")}
            />
        ),
    });
    return (
        <LinearGradient
            colors={["#380036", "#0CBABA"]}
            style={isMobile ? styles.container : styles.containerBigscreen}
        >
            <TodoForm />
            <TodoListItem />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
    },
    containerBigscreen: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
    },
});
