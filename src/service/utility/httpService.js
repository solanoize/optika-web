import NetworkErrorException from "../../exception/NetworkErrorException";
import ValidationDetailException from "../../exception/ValidationDetailException";
import ValidationErrorException from "../../exception/ValidationErrorException";

export default async function httpService(path, options = {}) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const buildPath = (str) => {
    try {
      new URL(str);
      return str;
    } catch {
      return `${BASE_URL}${str}`;
    }
  };

  const fetchOptions = {
    method: options.method || "GET",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  // kalau ada token, otomatis tambahkan Authorization
  if (options.auth) {
    const token = localStorage.getItem("token");
    fetchOptions.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(buildPath(path), fetchOptions);

    // parse JSON kalau ada body
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      if (response.status === 400 && data?.detail) {
        throw new ValidationDetailException(data);
      }

      throw new ValidationErrorException(data);
    }

    return data;
  } catch (error) {
    // Kalau error sudah custom → lempar ulang
    if (
      error instanceof ValidationErrorException ||
      error instanceof ValidationDetailException
    ) {
      throw error;
    }

    // Selain itu → baru dianggap network
    throw new NetworkErrorException(error);
  }
}
