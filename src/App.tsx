import Chart from "./components/Chart/Chart";
import Header from "./components/Header/Header";
import Memory from "./components/Memory/Memory";
import ProcessList from "./components/ProcessList/ProcessList";
import { useState, useContext, createContext } from "react";
import { ProcessProvider, ContextInterface } from "./Providers/ProcessProvider";
import { EscalonamentoTypes, MemoryAlgorithTypes } from "./types";

export default function App() {
  const [resetValue, setResetValue] = useState(0);
  const [turnaround, setTurnaround] = useState(0);
  const [time, setTime] = useState(1);
  const [processSelection, setProcessSelection] = useState(false);
  const [processStart, setProcessStart] = useState(false);
  const [numeroDeProcessos, setNumeroDeProcessos] = useState(0);
  const [sobrecarga, setSobrecarga] = useState(0);
  const [quantum, setQuantum] = useState(0);
  const [escalonamento, setEscalonamento] =
    useState<EscalonamentoTypes>("FIFO");
  const [algoritmoMemoria, setalgoritmoMemoria] =
    useState<MemoryAlgorithTypes>("FIFO");
  const [processData, setProcessData] = useState([]);
  const [memoryMap, setMemoryMap] = useState([]);
  const [diskTable, setDiskTable] = useState([]);
  const [queue, setQueue] = useState([]);
  const [executionHistory, setExecutionHistory] = useState([]);
  const values: ContextInterface = {
    time,
    setTime,
    processSelection,
    setProcessSelection,
    processStart,
    setProcessStart,
    numeroDeProcessos,
    setNumeroDeProcessos,
    sobrecarga,
    setSobrecarga,
    quantum,
    setQuantum,
    escalonamento,
    setEscalonamento,
    processData,
    setProcessData,
    memoryMap,
    setMemoryMap,
    diskTable,
    setDiskTable,
    queue,
    setQueue,
    executionHistory,
    setExecutionHistory,
    turnaround,
    setTurnaround,
    algoritmoMemoria,
    setalgoritmoMemoria,
  };

  function resetComponent() {
    setResetValue((old) => old + 1);
  }

  return (
    <main className="container">
      <ProcessProvider.Provider value={values}>
        <Header onReset={resetComponent} />
        {processSelection && <ProcessList key={resetValue} />}
        {processStart && <Chart key={resetValue + 1} />}
        {processStart && <Memory key={resetValue + 2} />}
      </ProcessProvider.Provider>
    </main>
  );
}
