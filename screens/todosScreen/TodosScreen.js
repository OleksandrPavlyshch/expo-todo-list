import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Todoform from "../../components/TodoForm/TodoForm";
import TodoListItem from "../../components/TodoList/TodoList";
import { Icon, Button } from "react-native-elements";
// import AppHeader from "../../components/AppHeader/AppHeader";

export default function TodosScreen({ navigation }) {
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
