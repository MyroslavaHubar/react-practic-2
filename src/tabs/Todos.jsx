import { Text, TodoList } from 'components';
import { useState, useEffect } from 'react';
import Form from '../components/Form/Form';
import { nanoid } from 'nanoid';

export const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem('todos')
    return data ? JSON.parse(data) : []
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  const addTodo = e => {
    e.preventDefault();
    const text = e.target.search.value.trim();
    const newTodo = {
      id: nanoid(),
      text,
    };

    setTodos([...todos, newTodo]);

    //     setTodos((prevTodos) => {
    //       return
    //         [...prevTodos, newTodo]
    // })
    e.currentTarget.reset();
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos)=> prevTodos.filter(todo => todo.id !== id))
  }

  return (
    <>
      <Text textAlign="center">There are no any todos ...</Text>
      <Form onSubmit={addTodo}></Form>
      <TodoList array={todos} onDelete={deleteTodo} />
    </>
  );
};
