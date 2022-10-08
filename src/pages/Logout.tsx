import * as React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import { Box, Layer, Spinner } from "grommet";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();
  const [logged, getUser, login, logout] = useAuthContext();

  useEffect(() => {
    logout();
    navigate("/login");
  }, []);

  return (
    <Layer full animation={"none"}>
      <Box fill align={"center"} justify={"center"}>
        <Spinner size={"large"} />
      </Box>
    </Layer>
  );
}
