import {
  Alert,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticationApiService } from "../../api-services/authentication.api-service";
import { authenticationService } from "../../services/authentication-service";
import { LoginCredentials } from "../../types/login.types";

const Login = () => {
  const navigate = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setLoginCredentials((prevState) => {
      return {
        ...prevState,
        [event.target.id]: value,
      };
    });
  };

  const handleSubmit = async () => {
    const response = await authenticationApiService.submitCredentials(
      loginCredentials
    );

    if (response.ok) {
      authenticationService.setToken(response.data.token);
      navigate("/");
    }
    if (!response.ok) {
      setLoginError(response.error);
    }
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      style={{ minHeight: "100vh" }}
    >
      <Stack spacing={2} style={{ width: 400 }}>
        <Typography variant="h2" component="h1">
          Ecommerce
        </Typography>
        {loginError && <Alert severity="error">{loginError}</Alert>}
        <TextField
          id="username"
          label="Username"
          value={loginCredentials.username}
          onChange={handleInputChange}
          required
        />
        <TextField
          id="password"
          label="Password"
          value={loginCredentials.password}
          onChange={handleInputChange}
          required
        />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </Stack>
    </Grid>
  );
};

export default Login;
