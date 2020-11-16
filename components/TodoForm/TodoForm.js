import React from "react";
import { Input, Icon, Button } from "react-native-elements";
import {  View, StyleSheet } from "react-native";
import { useTodo } from "../../context/todoContext";
import { Formik } from "formik";
import * as yup from "yup";

export default function Todoform() {
    const { addTodo } = useTodo();
    let schema = yup.object().shape({
        todo: yup.string()
            .min(2, "Mininum 2 characters")
            .max(50, "Maximum 50 characters")
            .required("Required!"),
    });

    const submitHandler = (values, actions) => {
        addTodo({
            title: values.todo,
            completed: false,
        });
        actions.setSubmitting(false);
        actions.resetForm();
    };


    return (
        <View style={styles.form}>
            <Formik
                initialValues={{ todo: "" }}
                validationSchema={schema}
                onSubmit={(values, actions) => submitHandler(values, actions)}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <React.Fragment>
                        <Input
                            style={styles.input}
                            placeholder="Enter you TODO text"
                            errorMessage={touched.todo && errors.todo}
                            containerStyle={styles.inputContainer}
                            onChangeText={handleChange("todo")}
                            name="todo"
                            value={values.todo}
                            disabled={isSubmitting}
                        />
                        <Button
                            title="Add todo"
                            iconRight={true}
                            type="outline"
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.buttonTitleStyle}
                            iconContainerStyle={styles.buttonIconContainer}
                            onPress={handleSubmit}
                            disabled={isSubmitting}
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
                    </React.Fragment>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 10,
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
