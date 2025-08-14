import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/todos - Get all todos
export async function GET() {
  try {
    const { data: allTodos, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return NextResponse.json(allTodos);
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
    const { text } = body as { text?: string };

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Todo text is required' },
        { status: 400 }
      );
    }

    const { data: newTodo, error } = await supabase
      .from('todos')
      .insert([{ text: text.trim() }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos - Clear all todos
export async function DELETE() {
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .neq('id', 0);

    if (error) throw error;
    return NextResponse.json({ message: 'All todos cleared successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear todos' },
      { status: 500 }
    );
  }
}
