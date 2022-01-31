import React, { createContext } from "react";
import { useStickyState } from "./useStickyState";

export const UserContext = createContext(null);

export function UserContextProvider(props) {
  const [user, setUser] = useStickyState(
    {
      userName: "",
      favouriteWord: "",
    },
    "current-user"
  );

  // Other user-validation related functions go here

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
