class AuthenticationService {
  setToken = (token: string): void => {
    sessionStorage.setItem("authToken", token);
  };

  isLoggedIn = (): boolean => {
    return sessionStorage.getItem("authToken") !== null;
  };
}

export const authenticationService = new AuthenticationService();
