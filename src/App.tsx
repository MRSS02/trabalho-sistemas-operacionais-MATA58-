import Chart from "./components/Chart/Chart";
import Header from "./components/Header/Header";
import Memory from "./components/Memory/Memory";
import ProcessList from "./components/ProcessList/ProcessList";
import { useState, useContext, createContext } from "react";
import { ProcessProvider } from './Providers/ProcessProvider'

export default function App() {

  const [processStart, setProcessStart] = useState(false)
  const [numeroDeProcessos, setNumeroDeProcessos] = useState(0)
  const [sobrecarga, setSobrecarga] = useState(0)
  const [quantum, setQuantum] = useState(0)
  const [escalonamento, setEscalonamento] = useState("")
  const [processData, setProcessData] = useState([])
    
  return (
    <main className="container">
      <ProcessProvider.Provider value={
      {processStart, setProcessStart,
      numeroDeProcessos, setNumeroDeProcessos, 
      sobrecarga, setSobrecarga, quantum, 
      setQuantum, escalonamento, setEscalonamento,
      processData, setProcessData
      }}>
        <Header />
        {processStart && <ProcessList /> }
        {processStart && <Chart /> }
        {processStart && <Memory /> }
      </ProcessProvider.Provider>
    </main>
  );
}
