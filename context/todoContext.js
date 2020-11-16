import React, { useContext, useReducer, useEffect } from "react";
import { ADD_TODOS, SET_USER, SET_USER_LOADING } from "../constants";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import { firebase } from "../firebase/config";

const TodoContext = React.createContext();

export const useTodo = () => {
    return useContext(TodoContext);
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case ADD_TODOS:
            return {
                ...state,
                loading: false,
                todos: action.todos,
            };
        case SET_USER_LOADING:
            return {
                ...state,
                userLoading: action.status,
            };
        default:
            return state;
    }
};

export const TodoProvider = ({ children }) => {
    const entityRef = firebase.firestore().collection("entities");

    const isTabletOrMobileDevice = useMediaQuery({
        maxDeviceWidth: 1224
    });


    const [state, dispatch] = useReducer(reducer, {
        todos: [],
        loading: false,
        user: null,
        loading: true,
        userLoading: true,
        isMobile: isTabletOrMobileDevice
    });

    const setUserLoading = (status) => dispatch({ type: SET_USER_LOADING, status });
    const addTodos = (todos) => dispatch({ type: ADD_TODOS, todos });
    const singOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                console.log("Sign-out successful");
                setUser(null);
            })
            .catch(function (error) {
                console.log(error, "An error happened");
            });
        };
    const addTodo = (todo) => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        entityRef
            .add({
                ...todo,
                authorID: state.user.id,
                createdAt: timestamp,
            })
            .catch((error) => {
                alert(error);
            });
    };
    const removeTodo = (id) => entityRef.doc(id).delete();
    const changeTodo = (payload) => {
        entityRef
            .doc(payload.id)
            .update({
                completed: payload.newData.completed,
            })
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            });
    };
    const setUser = (payload) => dispatch({ type: SET_USER, payload });

    const getUserTodos = (user) => {
        const userID = user.id;
        entityRef
            .where("authorID", "==", userID)
            .orderBy("createdAt", "desc")
            .onSnapshot(
                (querySnapshot) => {
                    const newEntities = [];
                    querySnapshot.forEach((doc) => {
                        const entity = doc.data();
                        entity.id = doc.id;
                        newEntities.push(entity);
                    });
                    addTodos(newEntities);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    useEffect(() => {
        const usersRef = firebase.firestore().collection("users");
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data();
                        setUser(userData);
                        setUserLoading(false);
                        getUserTodos(userData);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                console.log('User not exist');
                setUserLoading(false);
            }
        });
    }, []);

    return (
        <TodoContext.Provider
            value={{
                loading: state.loading,
                todos: state.todos,
                user: state.user,
                userLoading: state.userLoading,
                isMobile: state.isMobile,
                addTodo,
                addTodos,
                removeTodo,
                changeTodo,
                setUser,
                singOut,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
