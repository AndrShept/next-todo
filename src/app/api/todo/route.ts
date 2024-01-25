import { prisma } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos, { status: 200 });
};

export const POST = async (req: Request) => {
  const { title, imageUrl } = await req.json();

  if (!title) {
    return NextResponse.json(
      { message: 'Missing  field title ' },
      { status: 401 }
    );
  }
  if (!imageUrl) {
    return NextResponse.json(
      { message: 'Missing  field imageUrl ' },
      { status: 401 }
    );
  }
  try {
    const newTodo = await prisma.todo.create({
      data: { title, imageUrl },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.log('[DATABASE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
export const DELETE = async (req: Request) => {
  const  todoId  = await req.json();

  if (!todoId) {
    return NextResponse.json(
      { message: 'Missing  field todoId ' },
      { status: 401 }
    );
  }
  try {
    await prisma.todo.delete({
      where: { id: todoId },
    });

    return NextResponse.json('todo success deleted', { status: 200 });
  } catch (error) {
    console.log('[DATABASE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
