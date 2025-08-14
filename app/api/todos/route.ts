import { NextRequest, NextResponse } from 'next/server';
import { todos, addTodo} from '../../lib/todos';

// GET /api/todos - Get all todos
export async function GET() {
  try {
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Todo text is required' },
        { status: 400 }
      );
    }

    const newTodo = addTodo(text);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}


