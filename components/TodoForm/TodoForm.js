import React, { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { Text, View, StyleSheet } from "react-native";
import { useTodo } from "../../context/todoContext";

export default function Todoform(props) {
    const [todoText, setTodoText] = useState("");

    const submitTodo = (event) => {
        if (!todoText) return;
        addTodo({
            title: todoText,
            id: Date.now(),
            completed: false,
        });
        setTodoText("");
    };


    return (
        <View style={styles.form}>
            <Input
                style={styles.input}
                placeholder="Enter you TODO"
                errorMessage="asfasf"
                containerStyle={styles.inputContainer}
                onChange={(e) => setTodoText(e.target.value)}
                value={todoText}
            />
            <Button
                title="Add todo"
                iconRight={true}
                type="outline"
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitleStyle}
                iconContainerStyle={styles.buttonIconContainer}
                onPress={submitTodo}
                icon={
                    <Icon
                        style={styles.buttonIcon}
                        size={24}
                        name="library-add"
                        type="material"
                        color="white"
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 16,
        paddingTop: 16,
        paddingBottom: 25,
    },
    buttonIcon: {
        marginLeft: 10,
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    buttonTitleStyle: {
        color: "#fff",
        fontSize: 20,
    },
    input: {
        color: "#fff",
        fontSize: 20,
    },
    inputContainer: {
        marginBottom: 10,
    },
});
