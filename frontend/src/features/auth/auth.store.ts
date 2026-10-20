import { SafeSession } from "@/features/auth/auth.type";
import { RoutHandlerResponse } from "@/types/api.type";
import { create } from "zustand";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type SessionState = {
  session: SafeSession | null;
  status: AuthStatus;
  clearSession: () => void;
  updateSession: () => void;
};

async function fetchSession(): Promise<{
  session: SafeSession | null;
  status: AuthStatus;
}> {
  try {
    const res = await fetch(`/api/auth/session`);

    if (!res.ok) {
      return {
        session: null,
        status: "unauthenticated",
      };
    }

    const data: RoutHandlerResponse<SafeSession> | null = await res.json();

    if (!data) {
      return {
        session: null,
        status: "unauthenticated",
      };
    }

    return {
      session: data.data,
      status: "authenticated",
    };
  } catch {
    return {
      session: null,
      status: "unauthenticated",
    };
  }
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  status: "loading",
  clearSession: () => set({ session: null, status: "unauthenticated" }),
  updateSession: async () => {
    const { session, status } = await fetchSession();
    set({ session, status });
  },
}));

if (typeof window !== "undefined") {
  useSessionStore.getState().updateSession();
}
