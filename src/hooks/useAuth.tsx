import { log } from "util";
import { useState } from "react";
import { keyboardKey } from "@testing-library/user-event";

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export enum Role {
  cashier,
  warehouseman,
  director,
}

export type Credit = {
  login: string;
  password: string;
  role: Role;
};

export type Auth = [
  boolean,
  () => Credit,
  (
    login: PropType<Credit, "login">,
    password: PropType<Credit, "password">
  ) => void,
  () => void
];

export class IncorrectLogin extends Error {
  message = "Incorrect login!";
}

export class IncorrectPassword extends Error {
  message = "Incorrect password!";
}

export const credits: Credit[] = [
  {
    login: "pasha",
    password: "123456",
    role: Role.cashier,
  },
  {
    login: "masha",
    password: "123456",
    role: Role.warehouseman,
  },
  {
    login: "zhenya",
    password: "123456",
    role: Role.warehouseman,
  },
  {
    login: "boss",
    password: "123456",
    role: Role.director,
  },
];

export function useAuth(): Auth {
  const [logged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<Credit>();

  const getUser = (): Credit => {
    if (!logged || user === undefined) {
      throw new Error("Not logged!");
    }

    return user;
  };

  const login = (
    login: PropType<Credit, "login">,
    password: PropType<Credit, "password">
  ) => {
    const user = credits.find((credit: Credit) => credit.login === login);

    if (user === undefined) {
      throw new IncorrectLogin();
    }

    if (user.password !== password) {
      throw new IncorrectPassword();
    }

    setUser(user);
    setLogged(true);
  };

  const logout = () => {
    setUser(undefined);
    setLogged(false);
  };

  return [logged, getUser, login, logout];
}
