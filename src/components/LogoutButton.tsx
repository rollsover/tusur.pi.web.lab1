import * as React from "react";
import { Button } from "grommet";
import { Logout } from "grommet-icons";
import { Link } from "react-router-dom";

export function LogoutButton() {
  return (
    <Link to={"/logout"}>
      <Button label={"Logout"} icon={<Logout />} />
    </Link>
  );
}
