import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Role } from "../hooks/useAuth";

type Props = {
  children: React.ReactElement;
  onlyFor?: "all" | "logged" | "guest" | Role;
  onFailureNavigateTo?: string;
};

export function PrivateElement({
  onlyFor = "logged",
  children,
  onFailureNavigateTo,
}: Props) {
  const [logged, getUser] = useAuthContext();
  const navigate = useNavigate();

  onlyFor === "guest" && logged && navigate(onFailureNavigateTo ?? "/logout");
  onlyFor === "logged" && !logged && navigate(onFailureNavigateTo ?? "/login");
  Object.values(Role).includes(onlyFor) &&
    logged &&
    getUser().role !== onlyFor &&
    navigate(onFailureNavigateTo ?? "/logout");

  return children;
}
