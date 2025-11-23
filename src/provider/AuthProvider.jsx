import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import LoginComponent from "../component/authentication/LoginComponent";
import ValidationDetailException from "../exception/ValidationDetailException";
import ValidationErrorException from "../exception/ValidationErrorException";
import authLoginService from "../service/authentication/authLoginService";
import Swal from "sweetalert2";
import { AUTH_INIT } from "../constant/authentication";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(AUTH_INIT);

  const [loginLoading, setLoginLoading] = useState(false);

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((val) => ({ ...val, [name]: value }));
  };

  const onReset = () => {
    setUser(AUTH_INIT);
  };

  const onLogin = async () => {
    setLoginLoading(true);
    setValidationError(null);

    try {
      const data = await authLoginService(user.username, user.password);

      if (data?.access) {
        localStorage.setItem("token", data?.access);
        setAuthenticated(true);
        onReset();
      }
    } catch (error) {
      if (error instanceof ValidationDetailException) {
        Swal.fire({
          title: "Ups!",
          text: error?.data?.detail,
          icon: "warning",
        });
      } else if (error instanceof ValidationErrorException) {
        setValidationError(error.data);
      } else {
        console.log(error);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  useEffect(() => {
    (() => {
      const token = localStorage.getItem("token");
      setAuthenticated(Boolean(token));
    })();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          onLogout,
        }}
      >
        {!isAuthenticated && (
          <LoginComponent
            validationError={validationError}
            loading={loginLoading}
            onLogin={onLogin}
            onChange={onChange}
            user={user}
          />
        )}
        {isAuthenticated && children}
      </AuthContext.Provider>
    </>
  );
}
