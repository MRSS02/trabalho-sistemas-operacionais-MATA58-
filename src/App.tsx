import Chart from "./components/Chart/Chart";
import Header from "./components/Header/Header";
import Memory from "./components/Memory/Memory";
import ProcessList from "./components/ProcessList/ProcessList";
import { useState, useContext, createContext } from "react";
import { ProcessProvider } from './Providers/ProcessProvider';
import { EscalonamentoTypes } from './types' 

export default function App() {

  const [time, setTime] = useState(0)
  const [processSelection, setProcessSelection] = useState(false)
  const [processStart, setProcessStart] = useState(false)
  const [numeroDeProcessos, setNumeroDeProcessos] = useState(0)
  const [sobrecarga, setSobrecarga] = useState(0)
  const [quantum, setQuantum] = useState(0)
  const [escalonamento, setEscalonamento] = useState<EscalonamentoTypes>("FIFO")
  const [processData, setProcessData] = useState([])
  const [memoryMap, setMemoryMap] = useState([])
  const [diskTable, setDiskTable] = useState([])
  const [queue, setQueue] = useState([])
    
  return (
    <main className="container">
      <ProcessProvider.Provider value={
      {time, setTime, processSelection, 
      setProcessSelection, processStart, setProcessStart,
      numeroDeProcessos, setNumeroDeProcessos, 
      sobrecarga, setSobrecarga, quantum, 
      setQuantum, escalonamento, setEscalonamento,
      processData, setProcessData, memoryMap,
      setMemoryMap, diskTable, setDiskTable,
      queue, setQueue
      }}>
        <Header />
        {processSelection && <ProcessList /> }
        {processStart && <Chart /> }
        {processStart && <Memory /> }
      </ProcessProvider.Provider>
    </main>
  );
}
