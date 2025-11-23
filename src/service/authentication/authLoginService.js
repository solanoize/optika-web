import httpService from "../utility/httpService";

export default async function authLoginService(username, password) {
  const config = {
    method: "POST",
    body: JSON.stringify({ username, password }),
  };

  return httpService("/token/", config);
}
