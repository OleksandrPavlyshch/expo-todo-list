import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
// import TouchableScale from "react-native-touchable-scale";
import { ListItem } from 'react-native-elements';
import { useTodo } from "../../context/todoContext";

export default function TodoListItem({ title, id, completed }) {
    const { changeTodo, removeTodo } = useTodo();

    function updateTodoHandler () {
        changeTodo({
            id,
            newData: {
                completed: !completed,
            },
        });
    }

    return (
        <ListItem
            bottomDivider
            // Component={TouchableScale}
            Component={TouchableOpacity}
            friction={95}
            tension={50}
            activeScale={0.98}
            containerStyle={styles.Item}
            linearGradientProps={{
                colors: completed
                    ? ["#20BF55", "#01BAEF"]
                    : ["#F53844", "#42378F"],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
            }}
            onPress={updateTodoHandler}
        >
            <ListItem.CheckBox
                checkedColor="#fff"
                uncheckedColor="#fff"
                checked={completed}
                onPress={updateTodoHandler}
            />
            <ListItem.Content>
                <ListItem.Title
                    style={[styles.Title, completed && styles.completedTitle]}
                >
                    {title}
                </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron
                size={24}
                color="white"
                type="material"
                name="delete"
                onPress={() => removeTodo(id)}
            />
        </ListItem>
    );
}

const styles = StyleSheet.create({
    Item: {
        marginTop: 10,
        minHeight: 60,
        borderRadius: 15,
    },
    Title: {
        color: "white",
        fontWeight: "bold",
    },
    completedTitle: {
        textDecorationLine: "line-through"
    },
});

