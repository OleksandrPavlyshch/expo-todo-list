import React from "react";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen/RegistrationScreen";
import TodosScreen from "../screens/TodosScreen/TodosScreen";
import UserScreen from "../screens/UserScreen/UserScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTodo } from "../context/todoContext";
import { ActivityIndicator } from "react-native";

const Stack = createStackNavigator();

const styleOptions = {
    headerStyle: {
        backgroundColor: "#380036",
        borderBottomWidth: 1,
        borderColor: "#fff",
    },
    cardStyle: {
        backgroundColor: "transparent",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 24,
    },
};

export default function ScreenNavigations() {
    const { user, userLoading } = useTodo();
    if (userLoading) {
        return (
            <>
                <ActivityIndicator size="small" color="#fff" />
            </>
        );
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={styleOptions}>
                    {user ? (
                        <>
                            <Stack.Screen
                                options={{
                                    ...styleOptions,
                                    headerStyle: {
                                        ...styleOptions.headerStyle,
                                        borderBottomWidth: 1,
                                        borderColor: "#fff",
                                    },
                                }}
                                name="TODOS"
                                component={TodosScreen}
                            />
                            <Stack.Screen name="USER" component={UserScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                            />
                            <Stack.Screen
                                name="Registration"
                                component={RegistrationScreen}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
