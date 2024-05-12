/* eslint-disable react/prop-types */
import { useState } from "react";
import MyContext from "./myContext";

function MyState({ children }: { children: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <MyContext.Provider value={{ loading, setLoading }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
