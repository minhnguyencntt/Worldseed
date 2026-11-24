import { create } from 'zustand';
import { ApiError, getCurrentRound, type Round } from '../api/client';
import { describeRoundError } from '../lib/roundError';
import type { CanvasLayout } from '../lib/anchor';

export type ModalId = 'contribution';

export interface UiState {
  drawerOpen: boolean;
  canvasLayout: CanvasLayout | undefined;
  setCanvasLayout: (l: CanvasLayout) => void;
  modal: ModalId | null;
  toggleDrawer: () => void;
  openModal: (id: ModalId) => void;
  closeModal: () => void;
  soundEnabled: boolean;
  settingsOpen: boolean;
  toggleSound: () => void;
  toggleSettings: () => void;
  round: Round | undefined;
  roundLoading: boolean;
  roundError: string | undefined;
  loadRound: () => Promise<void>;
}

export const useUiStore = create<UiState>()((set) => ({
  drawerOpen: false,
  canvasLayout: undefined,
  setCanvasLayout: (l) => set({ canvasLayout: l }),
  modal: null,
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  openModal: (id) => set({ modal: id }),
  closeModal: () => set({ modal: null }),
  soundEnabled: true,
  settingsOpen: false,
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
  round: undefined,
  roundLoading: true,
  roundError: undefined,
  loadRound: async () => {
    set({ roundLoading: true, roundError: undefined });
    try {
      set({ round: await getCurrentRound() });
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) {
        set({ round: undefined });
      } else {
        set({ roundError: describeRoundError(e) });
      }
    } finally {
      set({ roundLoading: false });
    }
  },
}));
