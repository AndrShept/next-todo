import { format } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TodoProps {
  id: string;
  content: string | undefined;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string
}
interface TodoStore {
  data: TodoProps[];
  isEdit: boolean;
  setIsEdit: (bool: boolean) => void;
  addTodo: (todo: TodoProps) => void;
  removeTodo: (id: string) => void;
  clearAllTodo: () => void;
  onComplete: (id: string) => void;
  onEdit: ({
    content,
    id,
  }: {
    content?: string | undefined;
    id: string | undefined;
  }) => void;
}

export const useTodo = create<TodoStore>()(
  persist(
    (set) => ({
      data: [],
      isEdit: false,
      setIsEdit: (bool) => set({ isEdit: bool }),
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
                updatedAt:  format(new Date(), 'd MMM yyyy, HH:mm')
              };
            }
            return item;
          }),
        })),
    }),
    { name: 'todo-store' }
  )
);
