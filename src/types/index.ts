export type EscalonamentoTypes = "FIFO" | "SJF" | "Round Robin" | "EDF";

export type ProcessDataType = {
  state: 'executando' | 'espera' | 'sobrecarga',
  ownQuantum: number,
  overload: number, 
  arriveTime: number;
  executionTime: number;
  deadline: number;
  pages: number;
};

export type ProcessProps = {
  data: ProcessDataType, 
  index: number
}
