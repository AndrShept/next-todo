import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TodoProps {
  id: string;
  content: string;
  isCompleted: boolean;
  createdAt: string;
}
interface TodoStore {
  data: TodoProps[];
  addTodo: (todo: TodoProps) => void;
  removeTodo: (id: string) => void;
  clearAllTodo: () => void;
  onComplete: (id: string) => void;
  onEdit: ({ content, id }: { content: string; id: string }) => void;
}

export const useTodo = create<TodoStore>()(
  persist(
    (set) => ({
      data: [],
      addTodo: (todos: TodoProps) =>
        set((state) => ({ data: [...state.data, todos] })),
      removeTodo: (id) =>
        set((state) => ({ data: state.data.filter((todo) => todo.id !== id) })),
      clearAllTodo: () => set({ data: [] }),
      onComplete: (id) =>
        set((state) => ({
          data: state.data.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                isCompleted: !item.isCompleted,
              };
            }
            return item;
          }),
        })),
      onEdit: ({ content, id }) =>
        set((state) => ({
          data: state.data.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                content: content,
              };
            }
            return item
          }),
        })),
    }),
    { name: 'todo-store' }
  )
);
