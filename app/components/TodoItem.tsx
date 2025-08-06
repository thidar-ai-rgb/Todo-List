'use client';
type Props = {
  todo: { id: number; text: string; done: boolean };
  toggleDone: (id: number) => void;
  remove: (id: number) => void;
};

export default function TodoItem({ todo, toggleDone, remove }: Props) {
  return (
    <li className="flex justify-between items-center p-2 border rounded">
      <span className={todo.done ? 'line-through text-gray-500' : ''}>{todo.text}</span>
      <div className="space-x-2">
        <button onClick={() => toggleDone(todo.id)} className="text-sm bg-green-200 px-2">
          {todo.done ? 'Undo' : 'Done'}
        </button>
        <button onClick={() => remove(todo.id)} className="text-sm bg-red-200 px-2">✕</button>
      </div>
    </li>
  );
}