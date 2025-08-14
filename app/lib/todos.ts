// Shared in-memory storage for todos
export let todos: Array<{ id: number; text: string; done: boolean }> = [
  { id: 1, text: 'Try Next.js 🚀', done: false },
  { id: 2, text: 'Build API endpoints', done: false },
  { id: 3, text: 'Connect frontend to backend', done: false }
];

// Helper functions for todo operations
export const addTodo = (text: string) => {
  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    done: false
  };
  todos.push(newTodo);
  return newTodo;
};

export const updateTodo = (id: number, updates: Partial<{ text: string; done: boolean }>) => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) return null;
  
  todos[todoIndex] = { ...todos[todoIndex], ...updates };
  return todos[todoIndex];
};

