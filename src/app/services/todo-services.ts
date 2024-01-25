import { Todo } from '@prisma/client';

interface ITodo {
  imageUrl: string;
  title: string;
}

export const todoServices = {
  getTodos: async (): Promise<Todo[]> => {
    const res = await fetch('/api/todo', {
      method: 'GET',
    });
    return res.json();
  },
  createTodo: async (todo: ITodo): Promise<Todo> => {
    const res = await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify(todo),
    });
    return res.json();
  },
  deleteTodo: async (todoId: string) => {
    const res = await fetch('/api/todo', {
      method: 'DELETE',
      body: todoId,
    });
    return res.json();
  },
};

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch('/api/todo', {
    method: 'GET',
  });
  return res.json();
};
