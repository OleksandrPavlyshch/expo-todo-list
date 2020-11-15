import React, { useContext, useReducer, useEffect } from "react";
import {
    ADD_TODO,
    REMOVE_TODO,
    CHANGE_TODO,
    ADD_TODOS,
    REMOVE_ALL_TODOS,
    TODOS_URL,
    SET_USER,
} from "../constants";

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
        case ADD_TODO:
            return {
                ...state,
                todos: [action.todo, ...state.todos],
                history: {
                    ...state.history,
                    created: ++state.history.created,
                },
            };
        case REMOVE_ALL_TODOS:
            return {
                ...state,
                todos: [],
                history: {
                    ...state.history,
                    delited: state.todos.length,
                },
            };
        case REMOVE_TODO:
            const todo = state.todos.find((t) => t.id === action.id);
            const index = state.todos.indexOf(todo);
            state.todos.splice(index, 1);
            return {
                ...state,
                todos: state.todos,
                history: {
                    ...state.history,
                    delited: ++state.history.delited,
                },
            };
        case CHANGE_TODO:
            const newTodos = [...state.todos];
            const todoToChange = newTodos.find(
                (t) => t.id === action.payload.id
            );
            const todoToChangeindex = newTodos.indexOf(todoToChange);
            const updatedTodo = { ...todoToChange, ...action.payload.newData };
            newTodos.splice(todoToChangeindex, 1, updatedTodo);
            const newCompletedValue = () => {
                if (
                    !state.history.completed &&
                    !action.payload.newData.completed
                )
                    return state.history.completed;

                return (
                    state.history.completed +
                    (action.payload.newData.completed ? 1 : -1)
                );
            };
            return {
                ...state,
                todos: newTodos,
                history: {
                    ...state.history,
                    completed: newCompletedValue(),
                },
            };
        default:
            return state;
    }
};

export const TodoProvider = ({ children }) => {
    const entityRef = firebase.firestore().collection("entities");

    const [state, dispatch] = useReducer(reducer, {
        todos: [],
        loading: false,
        history: {
            delited: 0,
            completed: 0,
            created: 0,
        },
        user: null,
        loading: true,
    });

    const addTodos = (todos) => dispatch({ type: ADD_TODOS, todos });
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
    const removeTodo = (id) => dispatch({ type: REMOVE_TODO, id });
    const removeAllTodos = () => dispatch({ type: REMOVE_ALL_TODOS });
    const changeTodo = (payload) => dispatch({ type: CHANGE_TODO, payload });
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
                        getUserTodos(userData);
                    })
                    .catch((error) => {
                        // setLoading(false);
                    });
            } else {
                // setLoading(false);
            }
        });
    }, []);

    return (
        <TodoContext.Provider
            value={{
                loading: state.loading,
                todos: state.todos,
                history: state.history,
                user: state.user,
                addTodo,
                addTodos,
                removeTodo,
                removeAllTodos,
                changeTodo,
                setUser,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
