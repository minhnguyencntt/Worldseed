import { create } from 'zustand';

export type ModalId = 'contribution';

export interface UiState {
  drawerOpen: boolean;
  modal: ModalId | null;
  toggleDrawer: () => void;
  openModal: (id: ModalId) => void;
  closeModal: () => void;
  soundEnabled: boolean;
  settingsOpen: boolean;
  toggleSound: () => void;
  toggleSettings: () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  drawerOpen: false,
  modal: null,
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  openModal: (id) => set({ modal: id }),
  closeModal: () => set({ modal: null }),
  soundEnabled: true,
  settingsOpen: false,
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
}));
