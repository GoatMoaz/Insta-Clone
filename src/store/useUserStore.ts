import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the user interface
export interface User {
  id: string;
  email: string;
  userName: string;
  token: string;
  refreshToken: string;
  profilePic?: string;
}

// Define the auth state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Define the auth actions interface
interface AuthActions {
  login: (user: User) => void;
  logout: () => void;
}

// Combine state and actions
type UserStore = AuthState & AuthActions;

// Create the Zustand store with persistence
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "user-storage", // unique name for localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selector hooks for easier access to specific parts of the state
export const useUser = () => useUserStore((state) => state.user);
export const useIsAuthenticated = () =>
  useUserStore((state) => state.isAuthenticated);
