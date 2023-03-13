import {IUserContextProps, Props} from "@/types/types";
import {createContext, useCallback, useContext, useState} from "react";

const initialProps: IUserContextProps = {
  name: "",
  handleName: (arg: string) => {},
  handleNameInit: () => {},
};

const UserContext = createContext(initialProps);
export const useUser = () => useContext(UserContext);

const UserProvider = ({children}: Props) => {
  const [name, setName] = useState<string>("");

  const handleName = useCallback((arg: string) => {
    setName(arg);
  }, []);
  const handleNameInit = useCallback(() => {
    setName("");
  }, []);

  return (
    <UserContext.Provider value={{name, handleName, handleNameInit}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
