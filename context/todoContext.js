import React, { useContext, useReducer, useEffect } from "react";
import {
    ADD_TODO,
    REMOVE_TODO,
    CHANGE_TODO,
    ADD_TODOS,
    REMOVE_ALL_TODOS,
    TODOS_URL,
} from "../constants";

const TodoContext = React.createContext();

export const useTodo = () => {
    return useContext(TodoContext);
};

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TODOS:
            return {
                ...state,
                loading: false,
                todos: [...action.todos, ...state.todos],
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
                    delited: ++state.history.delited
                },
            };
        case CHANGE_TODO:
            const newTodos = [...state.todos]
            const todoToChange = newTodos.find(
                (t) => t.id === action.payload.id
            );
            const todoToChangeindex = newTodos.indexOf(todoToChange);
            const updatedTodo = { ...todoToChange, ...action.payload.newData };
            newTodos.splice(todoToChangeindex, 1, updatedTodo);
            const newCompletedValue = () => {
                if (
                    !state.history.completed && !action.payload.newData.completed
                ) return state.history.completed;

                return state.history.completed + (action.payload.newData.completed ? 1 : -1);
            }
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
    const [state, dispatch] = useReducer(reducer, {
        todos: [],
        loading: true,
        history: {
            delited: 0,
            completed: 0,
            created: 0,
        },
    });

    const addTodos = (todos) => dispatch({ type: ADD_TODOS, todos });
    const addTodo = (todo) => dispatch({ type: ADD_TODO, todo });
    const removeTodo = (id) => dispatch({ type: REMOVE_TODO, id });
    const removeAllTodos = () => dispatch({ type: REMOVE_ALL_TODOS });
    const changeTodo = (payload) => dispatch({ type: CHANGE_TODO, payload });

    useEffect(() => {
        fetch(TODOS_URL)
            .then((response) => response.json())
            .then((json) => addTodos(json));
    }, []);

    return (
        <TodoContext.Provider
            value={{
                loading: state.loading,
                todos: state.todos,
                history: state.history,
                addTodo,
                addTodos,
                removeTodo,
                removeAllTodos,
                changeTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
