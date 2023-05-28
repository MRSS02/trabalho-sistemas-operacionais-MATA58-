import { create } from "zustand";
import { IntialDataType, ProcessDataType } from "../types";

export const useInitialDataStore = create<IntialDataType>((set) => ({
  numeroDeProcessos: 0,
  sobrecarga: 0,
  quantum: 0,
  escalonameto: undefined,
  setNumeroDeProcessos: (numeroDeProcessos: number) =>
    set({ numeroDeProcessos }),
}));
