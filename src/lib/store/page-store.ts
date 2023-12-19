import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PageStoreProps {
  queryPage: number | null;
  amountOnPage: number;
  setQueryPage: (page: number) => void;
  incrementQueryPage: () => void;
  decrementQueryPage : ()=> void
}

export const usePageStore = create<PageStoreProps>()(
  persist(
    (set) => ({
      queryPage: null,
      amountOnPage: 6,
      setQueryPage: (page) => set({ queryPage: page }),
      incrementQueryPage: () =>
        set((state) => ({ queryPage: state.queryPage! + 1 })),
      decrementQueryPage: () =>
        set((state) => ({ queryPage: state.queryPage! - 1 })),
    }),
    { name: 'page-store' }
  )
);
