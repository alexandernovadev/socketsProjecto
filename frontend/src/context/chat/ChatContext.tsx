import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { Action, chatReducer, ChatState } from "./chatReducer";

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<{
  chatState: ChatState;
  dispatch: Dispatch<Action>;
}>({
  chatState: {
    uid: "",
    chatActivo: null,
    usuarios: [],
    mensajes: [],
  },
  dispatch: () => null,
});

const initialState: ChatState = {
  uid: "",
  chatActivo: null,
  usuarios: [],
  mensajes: [],
};

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
