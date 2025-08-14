'use client';
import { useState,useEffect } from 'react';
import TodoItem from './components/TodoItem';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState([{ id: 1, text: 'Try Next.js 🚀', done: false }]);
  const [text, setText] = useState('');
   const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
// Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);
const fetchTodos = async () => {
    try {
        setError(null);
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async () => {
    if (!text.trim()|| submitting) return;
       
    try {
      setSubmitting(true);
       setError(null);
       const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
        if (!response.ok) throw new Error('Failed to add todo');
         const newTodo = await response.json();
      setTodos(prev => [...prev, newTodo]);
      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleDone = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const remove = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <main className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4 bg-red-500">✅ Todo List</h1>
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