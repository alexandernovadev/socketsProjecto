import { variables } from "../config/vars";

const baseUrl = variables.VITE_SOCKET_URL + "/api";

export const fetchSinToken = async (
  endpoint: string,
  data: object,
  method = "GET"
) => {
  const url = `${baseUrl}${endpoint}`;
  if (method === "GET") {
    const resp = await fetch(url);
    return resp.json();
  }
  const resp = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return resp.json();
};

export const fetchConToken = async (
  endpoint: string,
  data: object,
  method = "GET"
) => {
  const url = `${baseUrl}${endpoint}`;
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token") || "";
  if (method === "GET") {
    const resp = await fetch(url, {
      headers: {
        "x-token": token,
      },
    });

    return resp.json();
  }
  const resp = await fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });

  return resp.json();
};
