import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon} from "react-native-elements";
import { useTodo } from "../../context/todoContext";

export default function TodoListItem({ title, id, completed }) {
    const { changeTodo, removeTodo } = useTodo();

    function updateTodoHandler() {
        changeTodo({
            id,
            newData: {
                completed: !completed,
            },
        });
    }

    return (
        <View>
            <TouchableOpacity onPress={updateTodoHandler}>
                <LinearGradient
                    colors={
                        completed
                            ? ["#20BF55", "#01BAEF"]
                            : ["#F53844", "#42378F"]
                    }
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0.2, y: 0 }}
                    style={styles.container}
                >
                    <Icon
                        style={styles.buttonIcon}
                        size={28}
                        name={
                            completed
                                ? "check-circle"
                                : "radio-button-unchecked"
                        }
                        type="material"
                        color="white"
                    />
                    <Text
                        style={[
                            styles.Title,
                            completed && styles.completedTitle,
                        ]}
                    >
                        {title}
                    </Text>
                    <Icon
                        style={styles.buttonIcon}
                        size={28}
                        name="delete"
                        type="material"
                        color="white"
                        onPress={() => removeTodo(id)}
                    />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 12,
        minHeight: 50,
        marginTop: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    Title: {
        color: "white",
        fontWeight: "bold",
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
    },
    completedTitle: {
        textDecorationLine: "line-through",
    },
});
