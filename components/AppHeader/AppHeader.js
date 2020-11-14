import React from 'react';
import { StyleSheet } from "react-native";
import { Header, Icon, Button } from "react-native-elements";

export default function AppHeader(props) {


    return (
        <Header
            containerStyle={styles.header}
            centerComponent={{
                text: "TODOS",
                style: styles.headerCenter,
            }}
            rightComponent={
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
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
    },
    headerCenter: {
        color: "#fff",
        fontSize: 24,
    },
});
