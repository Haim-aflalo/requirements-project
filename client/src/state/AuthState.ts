import { create } from "zustand";

interface AuthState {
  role: string;
  setRole: (role: string) => void;
  logout: () => void;
}

export const useAuthState = create<AuthState>((set) => ({
  role: "",
  agentCode: "",
  setRole: (role) => set({ role }),
  logout: () => set({ role: "" }),
}));
