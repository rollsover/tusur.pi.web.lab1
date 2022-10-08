import { createContext, useContext } from "react";
import { Auth } from "../hooks/useAuth";

class NotProvidedError extends Error {
  message = "Auth context not provided!";
}

export const AuthContext = createContext<Auth>([
  false,
  () => {
    throw new NotProvidedError();
  },
  () => {
    throw new NotProvidedError();
  },
  () => {
    throw new NotProvidedError();
  },
]);

export function useAuthContext() {
  return useContext(AuthContext);
}
