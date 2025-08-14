'use client';
import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import LoadingSpinner from './components/LoadingSpinner';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!text.trim() || submitting) return;
    
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

  const toggleDone = async (id: number) => {
    try {
      setError(null);
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !todo.done })
      });
      
      if (!response.ok) throw new Error('Failed to update todo');
      
      const updatedTodo = await response.json();
      setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const updateText = async (id: number, newText: string) => {
    try {
      setError(null);
      const trimmed = newText.trim();
      if (!trimmed) throw new Error('Todo text cannot be empty');

      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed })
      });

      if (!response.ok) throw new Error('Failed to update todo');

      const updatedTodo = await response.json();
      setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const remove = async (id: number) => {
    try {
      setError(null);
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete todo');
      
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  const clearAll = async () => {
    if (todos.length === 0) return;
    
    try {
      setError(null);
      const response = await fetch('/api/todos', {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to clear todos');
      
      setTodos([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear todos');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  if (loading) {
    return (
      <main className="max-w-xl mx-auto p-4 font-sans">
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <LoadingSpinner size="lg" />
          <div className="text-lg text-gray-600">Loading todos...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">✅ Todo List</h1>
      
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {/* Add Todo Form */}
      <div className="flex gap-2 mb-6">
        <input 
          value={text} 
          onChange={e => setText(e.target.value)} 
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?" 
          className="border border-gray-300 p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={submitting}
        />
        <button 
          onClick={addTodo} 
          disabled={submitting || !text.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {submitting ? 'Adding...' : 'Add'}
        </button>
      </div>

      {/* Clear All Button */}
      {todos.length > 0 && (
        <div className="mb-4">
          <button 
            onClick={clearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Clear All ({todos.length})
          </button>
        </div>
      )}

      {/* Todos List */}
      {todos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <div className="text-xl">No tasks yet!</div>
          <div className="text-sm">Add a task above to get started</div>
        </div>
      ) : (
        <ul className="space-y-3">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} toggleDone={toggleDone} remove={remove} updateText={updateText} />
          ))}
        </ul>
      )}
    </main>
  );
}