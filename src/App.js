import React from "react";
import "./App.css";
import Container from "./Views/Container/Container";
import { useLocalState } from "./hooks/hooks";

export const CartContext = React.createContext();

export default function App(props) {

  const [cart, setCart] = useLocalState("cart");

  return (
    <CartContext.Provider value={[cart, setCart]}>
      <Container />
    </CartContext.Provider>
  );

}
