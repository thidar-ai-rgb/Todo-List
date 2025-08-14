'use client';
import { useState } from 'react';
import TodoItem from './components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState([{ id: 1, text: 'Try Next.js 🚀', done: false }]);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text, done: false };
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleDone = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const remove = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <main className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">✅ Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="New task" className="border p-2 flex-1"/>
        <button onClick={addTodo} className="bg-blue-500 text-white px-4">Add</button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleDone={toggleDone} remove={remove} />
        ))}
      </ul>
    </main>
  );
}