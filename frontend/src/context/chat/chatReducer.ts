import { types } from "../../types/types";

export interface Usuario {
  email: string;
  id: string;
  name: string;
  online: string;
  surname: string;
}

export interface Mensaje {
  de: string;
  para: string;
  mensaje: string;
}

export interface ChatState {
  uid: string;
  chatActivo: Usuario | null;
  usuarios: Usuario[];
  mensajes: Mensaje[];
}

export interface Action {
  type: string;
  payload?: any;
}

export const initialState: ChatState = {
  uid: "",
  chatActivo: null,
  usuarios: [],
  mensajes: [],
};

export const chatReducer = (
  state: ChatState = initialState,
  action: Action
): ChatState => {
  switch (action.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: [...action.payload],
      };

    case types.activarChat:
      if (state.chatActivo?.id === action.payload.id) return state;

      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      };

    case types.nuevoMensaje:
      if (
        state.chatActivo === action.payload.de ||
        state.chatActivo === action.payload.para
      ) {
        return {
          ...state,
          mensajes: [...state.mensajes, action.payload],
        };
      } else {
        return state;
      }

    case types.cargarMensajes:
      return {
        ...state,
        mensajes: [...action.payload],
      };

    default:
      return state;
  }
};
