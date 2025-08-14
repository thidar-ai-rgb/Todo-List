'use client';
import { useState } from 'react';

type Props = {
  todo: { id: number; text: string; done: boolean };
  toggleDone: (id: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
  updateText: (id: number, text: string) => Promise<void>;
};

export default function TodoItem({ todo, toggleDone, remove, updateText }: Props) {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async () => {
    if (isToggling) return;
    setIsToggling(true);
    try {
      await toggleDone(todo.id);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await remove(todo.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    setDraft(todo.text);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (isSaving) return;
    const trimmed = draft.trim();
    if (!trimmed) return;
    setIsSaving(true);
    try {
      await updateText(todo.id, trimmed);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <li className="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={handleToggle}
          disabled={isToggling}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.done
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          } ${isToggling ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {todo.done && <span className="text-sm">✓</span>}
        </button>
        {isEditing ? (
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            autoFocus
            className="flex-1 text-lg border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <span 
            className={`flex-1 text-lg transition-all duration-200 ${
              todo.done 
                ? 'line-through text-gray-500' 
                : 'text-gray-800'
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="flex space-x-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={isSaving || draft.trim().length === 0}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isSaving || draft.trim().length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
              }`}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              disabled={todo.done}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-yellow-500 hover:bg-yellow-600 text-white hover:scale-105"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDeleting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 text-white hover:scale-105'
              }`}
            >
              {isDeleting ? '...' : 'Delete'}
            </button>
          </>
        )}
      </div>
    </li>
  );
}