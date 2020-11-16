import React from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import TodoListItem from './TodoListItem';
import { useTodo } from "../../context/todoContext";

export default function TodoList(props) {
    const { loading, todos } = useTodo();

    return (
        <SafeAreaView style={styles.container}>
            {loading ?
                <ActivityIndicator size="small" color="#fff" />
                :
                <FlatList
                    data={todos}
                    renderItem={({ item }) => <TodoListItem {...item} />}
                    keyExtractor={(item, index) => `${index}-${item.id}-${item.title}`}
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        alignItems: "stretch",
        justifyContent: "center",
    },
});

