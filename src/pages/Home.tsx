import * as React from "react";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Box, Heading, Layer, Spinner } from "grommet";
import { useNavigate } from "react-router-dom";
import { Role } from "../hooks/useAuth";
import { LogoutButton } from "../components/LogoutButton";

export function Home() {
  const navigaate = useNavigate();
  const [logged, getUser, login, logout] = useAuthContext();

  useEffect(() => {
    switch (getUser().role) {
      case Role.cashier:
        navigaate("/cashier");
        return;
      case Role.warehouseman:
        navigaate("/warehouseman");
        return;
      case Role.director:
        navigaate("/director");
        return;
    }
  }, []);

  return <Spinner size={"large"} />;
}

function RoleHome({ name }: { name: string }) {
  return (
    <Layer full animation={"none"}>
      <Box fill gap={"small"} align={"center"} justify={"center"}>
        <Heading>Welcome {name}!</Heading>
        <LogoutButton />
      </Box>
    </Layer>
  );
}

export const CashierHome = () => <RoleHome name={"cashier"} />;
export const WarehousemanHome = () => <RoleHome name={"warehouseman"} />;
export const DirectorHome = () => <RoleHome name={"director"} />;
