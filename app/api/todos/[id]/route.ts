import { NextRequest, NextResponse } from 'next/server';
import { updateTodo} from '../../../lib/todos';

// PATCH /api/todos/:id - Update todo done status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { done } = body;

    const updatedTodo = updateTodo(id, { done });
    
    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

