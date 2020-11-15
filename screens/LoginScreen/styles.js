import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {},
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30,
    },
    input: {
        color: "#fff",
        fontSize: 20,
    },
    button: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    buttonTitle: {
        color: "#fff",
        fontSize: 20,
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: "#a2a2a2",
    },
    footerLink: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
