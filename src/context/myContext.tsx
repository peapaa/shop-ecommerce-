import { createContext, Context } from "react";

interface MyContextType {}

const myContext: Context<MyContextType> = createContext<MyContextType>({});

export default myContext;
