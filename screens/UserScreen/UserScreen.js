import React from 'react'
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTodo } from "../../context/todoContext";
import { Icon, Button } from "react-native-elements";

export default function UserScreen() {
    const { user, singOut } = useTodo();
    const onLogoutPress = () => {
        singOut();
    }

    return (
        <>
            <LinearGradient
                colors={["#380036", "#0CBABA"]}
                style={styles.container}
            >
                {!!user && (
                    <>
                        <View style={styles.userData}>
                            <Text style={styles.userDataLabel}>Name</Text>
                            <Text style={styles.userDataText}>{user.fullName}</Text>
                        </View>
                        <View style={styles.userData}>
                            <Text style={styles.userDataLabel}>Email</Text>
                            <Text style={styles.userDataText}>{user.email}</Text>
                        </View>
                    </>
                )}
                <Button
                    title="LOG OUT"
                    type="outline"
                    iconRight={true}
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                    onPress={() => onLogoutPress()}
                    icon={
                        <Icon
                            style={styles.buttonIcon}
                            size={24}
                            name="power-settings-new"
                            type="material"
                            color="white"
                        />
                    }
                />
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "stretch",
        padding: 10,
        paddingTop: 16,
        paddingBottom: 25,
    },
    buttonIcon: {
        marginLeft: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    buttonTitle: {
        color: "#fff",
        fontSize: 20,
    },
    userDataLabel: {
        color: "#f0f0f0",
        fontSize: 14,
    },
    userDataText: {
        color: "#fff",
        fontSize: 20,
    },
    userData: {
        padding: 10,
    },
});
