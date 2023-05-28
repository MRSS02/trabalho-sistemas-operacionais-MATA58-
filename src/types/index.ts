export type EscalonamentoTypes = "FIFO" | "SJF" | "Round Robin" | "EDF";

export type IntialDataType = {
  numeroDeProcessos?: number;
  sobrecarga?: number;
  quantum?: number;
  escalonameto?: EscalonamentoTypes;
  setNumeroDeProcessos: (number: number) => void;
  setSobrecarga: (number: number) => void;
  setQuantum: (number: number) => void;
  setEscalonamento: (EscalonamentoTypes: EscalonamentoTypes) => void;
  initialDataLock: boolean;
  setInitialDataLock: (bollean: boolean) => void;
};

export type AllProcessesType = {
  allProcesses: number;
  processList?: ProcessDataType[];
};

export type ProcessDataType = {
  tempoDeChegada?: number;
  TempoDeExecução?: number;
  deadline?: number;
  paginas?: number;
};
