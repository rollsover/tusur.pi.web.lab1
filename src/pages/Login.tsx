import * as React from "react";
import {
  Box,
  Layer,
  Text,
  Form,
  Button,
  FormField,
  TextInput,
  Heading,
  Grid,
  DataTable,
  Paragraph,
} from "grommet";
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Credit, credits } from "../hooks/useAuth";
import { Copy } from "grommet-icons";

export function Login() {
  const [value, setValue] = useState({ login: "", password: "" });
  const [logged, getUser, login, logout] = useAuthContext();

  const [errorMessage, setErrorMessage] = useState<string>();

  return (
    <Grid
      fill
      rows={["flex"]}
      columns={["1/2", "1/2"]}
      areas={[["login", "help"]]}
      gap="small"
    >
      <Box
        gridArea={"login"}
        fill
        align={"center"}
        justify={"center"}
        gap={"small"}
      >
        <Heading>Login</Heading>
        <Form
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onSubmit={() => {
            try {
              login(value.login, value.password);
            } catch (error: any) {
              setErrorMessage(error.message);
            }
          }}
        >
          <FormField name={"login"} label={"Login"} required>
            <TextInput name={"login"} placeholder={"name"} />
          </FormField>
          <FormField name={"password"} label={"Password"} required>
            <TextInput
              name={"password"}
              type={"password"}
              placeholder={"*****"}
            />
          </FormField>
          {errorMessage && (
            <Box pad={{ horizontal: "small" }}>
              <Text color="status-error">{errorMessage}</Text>
            </Box>
          )}
          <Button label={"Login"} type={"submit"} primary />
        </Form>
      </Box>
      <Box gridArea={"help"} fill align={"center"} justify={"center"}>
        <DataTable
          paginate
          columns={[
            { property: "login", header: "Login" },
            { property: "password", header: "Password" },
            { property: "role", header: "Role" },
          ]}
          data={credits}
          onClickRow={({ datum }) => {
            setValue({ login: datum.login, password: datum.password });
          }}
        />
      </Box>
    </Grid>
  );
}
