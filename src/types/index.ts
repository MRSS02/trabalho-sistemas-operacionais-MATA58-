export type IntialDataType = {
  numeroDeProcessos: number;
  sobrecarga: number;
  quantum: number;
  escalonameto: "FIFO" | "SJF" | "Round Robin" | "EDF";
};

export type ProcessDataType = {
  tempoDeChegada: number;
  TempoDeExecução: number;
  deadline: number;
  paginas: number;
};
