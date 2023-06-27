export type EscalonamentoTypes = "FIFO" | "SJF" | "Round Robin" | "EDF";

export type ProcessDataType = {
  state: 'executando' | 'espera' | 'sobrecarga' | 'finalizado' | 'a caminho',
  ownQuantum: number,
  overload: number, 
  arriveTime: number;
  executionTime: number;
  deadline: number;
  brokeDeadline: boolean;
  pages: number;
};

export type ProcessProps = {
  data: ProcessDataType, 
  index: number
}
