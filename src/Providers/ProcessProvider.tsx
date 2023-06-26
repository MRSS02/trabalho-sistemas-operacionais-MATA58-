import { createContext } from 'react'
import { ProcessDataType, EscalonamentoTypes } from '../types' 

export interface ContextInterface {
    processSelection: boolean,
    setProcessSelection: Function,
    processStart: boolean,
    setProcessStart: Function,
    time: number,
    setTime: Function,
    numeroDeProcessos: number,
    setNumeroDeProcessos: Function, 
    sobrecarga: number,
    setSobrecarga: Function,
    quantum: number,
    setQuantum: Function,
    escalonamento: EscalonamentoTypes,
    setEscalonamento: Function,
    processData: Array<ProcessDataType>,
    setProcessData: Function,
    memoryMap: Array<number>,
    setMemoryMap: Function,
    diskTable: Array<number>,
    setDiskTable: Function,
    queue: Array<number>,
    setQueue: Function
  }

export const ProcessProvider = createContext<ContextInterface>({
      processSelection: false,
      setProcessSelection:  (processSelection: false) => {},
      processStart: false, 
      setProcessStart: (processStart: false) => {},
      time: 0,
      setTime: (time: 0) => {},
      numeroDeProcessos: 0, 
      setNumeroDeProcessos: (numeroDeProcessos: 0) => {}, 
      sobrecarga: 0,
      setSobrecarga: (sobrecarga: 0) => {}, 
      quantum: 0,
      setQuantum: (quantum: 0) => {},
      escalonamento: "FIFO",
      setEscalonamento: (escalonamento: "") => {},
      processData: [],
      setProcessData: (processData: []) => {},
      memoryMap: [],
      setMemoryMap:  (memoryMap: []) => {},
      diskTable: [],
      setDiskTable: (diskTable: []) => {},
      queue: [],
      setQueue: (diskTable: []) => {},

})
