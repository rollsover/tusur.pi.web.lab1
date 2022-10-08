import React from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Role, useAuth } from "./hooks/useAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Logout } from "./pages/Logout";
import { PrivateElement } from "./components/PrivateElement";
import { Login } from "./pages/Login";
import {
  CashierHome,
  DirectorHome,
  Home,
  WarehousemanHome,
} from "./pages/Home";

export default function App() {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/login"}
            element={
              <PrivateElement onlyFor={"guest"} onFailureNavigateTo={"/"}>
                <Login />
              </PrivateElement>
            }
          />
          <Route path={"/logout"} element={<Logout />} />
          <Route
            path={"/"}
            element={
              <PrivateElement onlyFor={"logged"}>
                <Home />
              </PrivateElement>
            }
          />
          <Route
            path={"/cashier"}
            element={
              <PrivateElement onlyFor={Role.cashier}>
                <CashierHome />
              </PrivateElement>
            }
          />
          <Route
            path={"/warehouseman"}
            element={
              <PrivateElement onlyFor={Role.warehouseman}>
                <WarehousemanHome />
              </PrivateElement>
            }
          />
          <Route
            path={"/director"}
            element={
              <PrivateElement onlyFor={Role.director}>
                <DirectorHome />
              </PrivateElement>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
