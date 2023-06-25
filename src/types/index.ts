export type EscalonamentoTypes = "FIFO" | "SJF" | "Round Robin" | "EDF";

export type ProcessDataType = {
  arriveTime?: number;
  executionTime?: number;
  deadline?: number;
  pages?: number;
};

export type ProcessProps = {
  data: ProcessDataType, 
  index: number
}
