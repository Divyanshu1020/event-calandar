import { useContext } from "react";
import { createCalandarContext } from "../context/context";

const useCalandar = () => useContext(createCalandarContext);

export { useCalandar }