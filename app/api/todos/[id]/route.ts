import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
); 

// PATCH /api/todos/:id - Update todo done status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
     const { done, text } = body as { done?: boolean; text?: string };
    const updates: Partial<{ text: string; done: boolean }> = {};

     if (typeof done === 'boolean') {
      updates.done = done;
    }

    if (typeof text === 'string') {
      const trimmed = text.trim();
      if (!trimmed) {
        return NextResponse.json(
          { error: 'Todo text cannot be empty' },
          { status: 400 }
        );
      }
      updates.text = trimmed;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    try {
      const { data: updatedTodo, error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(updatedTodo);
    } catch (e) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}
