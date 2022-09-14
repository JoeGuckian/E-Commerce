import { LoginCredentials, Token } from "../types/login.types";
import { ApiResponse } from "../types/shared.types";

class AuthenticationApiService {
  submitCredentials = async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<Token>> => {
    const body = JSON.stringify(credentials);

    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: body,
    });

    const apiResponse: ApiResponse<Token> = {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: response.ok ? await response.json() : undefined,
      error: !response.ok ? await response.text() : undefined,
    };

    return apiResponse;
  };
}

export const authenticationApiService = new AuthenticationApiService();
