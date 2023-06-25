import { createContext } from 'react'

interface ContextInterface {
    processStart: boolean,
    setProcessStart: Function, 
    numeroDeProcessos: number,
    setNumeroDeProcessos: Function, 
    sobrecarga: number,
    setSobrecarga: Function,
    quantum: number,
    setQuantum: Function,
    escalonamento: string,
    setEscalonamento: Function,
    processData: Array<Array<any>>,
    setProcessData: Function,
    memoryMap: Array<number>,
    setMemoryMap: Function,
    diskTable: Array<number>,
    setDiskTable: Function,
  }

export const ProcessProvider = createContext<ContextInterface>({ 
      processStart: false, 
      setProcessStart: (processStart: false) => {},
      numeroDeProcessos: 0, 
      setNumeroDeProcessos: (numeroDeProcessos: 0) => {}, 
      sobrecarga: 0,
      setSobrecarga: (sobrecarga: 0) => {}, 
      quantum: 0,
      setQuantum: (quantum: 0) => {},
      escalonamento: "",
      setEscalonamento: (escalonamento: "") => {},
      processData: [],
      setProcessData: (processData: []) => {},
      memoryMap: [],
      setMemoryMap:  (memoryMap: []) => {},
      diskTable: [],
      setDiskTable: (diskTable: []) => {},
})
