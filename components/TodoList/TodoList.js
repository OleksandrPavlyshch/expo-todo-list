import React from 'react';
import { FlatList } from 'react-native';
import TodoListItem from './TodoListItem';
import { useTodo } from "../../context/todoContext";

export default function TodoList(props) {
    const { loading, todos, changeTodo, removeTodo } = useTodo();


    return (
        <FlatList
            style={styles.container}
            data={todos}
            renderItem={TodoListItem}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

