import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Role } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Spinner } from "grommet";

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
  const [accepted, setAccepted] = useState(false);

  if (onlyFor === "guest" && logged) {
    return <Navigate to={onFailureNavigateTo ?? "/logout"} />;
  } else if (onlyFor === "logged" && !logged) {
    return <Navigate to={onFailureNavigateTo ?? "/login"} />;
  } else if (
    Object.values(Role).includes(onlyFor) &&
    (!logged || (logged && getUser().role !== onlyFor))
  ) {
    return <Navigate to={onFailureNavigateTo ?? "/logout"} />;
  }

  return children;
}
