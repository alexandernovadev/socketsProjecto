import { variables } from "../config/vars";

export const getUltimos = async () => {
  const resp = await fetch(`${variables.VITE_SOCKET_URL}/ultimos`);
  const data = await resp.json();

  return data.ultimos;
};
