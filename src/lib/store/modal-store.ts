import { IPost } from '@/app/hooks/post-hooks';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IModalData {
  post: IPost;
}
type IType = 'postById';

interface useModalStoreState {
  data?: IModalData;
  type: IType | null;
  isOpen: boolean;
  onOpen: (type: IType, data?: IModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<useModalStoreState>()(
  persist(
    (set) => ({
      isOpen: false,
      type: null,
      onOpen: (type, data) => set({ isOpen: true, data, type }),
      onClose: () => set({ isOpen: false, type: null }),
    }),
    { name: 'post-store' }
  )
);
