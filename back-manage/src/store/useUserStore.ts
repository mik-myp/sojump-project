import type { IUserInfo } from '@/service/interface';
import { create } from 'zustand';

const userInfo: IUserInfo = {
  _id: '',
  username: '',
  createdAt: '',
  updatedAt: '',
};

const useUserStore = create<{
  userInfo: IUserInfo;
  saveUserInfo: (useInfo: IUserInfo) => void;
  clearUserInfo: () => void;
}>(set => ({
  userInfo,
  saveUserInfo: user => set({ userInfo: user }),
  clearUserInfo: () =>
    set({
      userInfo,
    }),
}));

export default useUserStore;
