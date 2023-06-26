import Process from "./Process/Process";
import "./style.scss";
import { useContext } from 'react'
import { ProcessProvider, ContextInterface } from '../../Providers/ProcessProvider'
import { ProcessDataType } from '../../types'

export default function ProcessList() {
  
  const processValues = useContext(ProcessProvider)
  let cycleInterval:number = 0

    function runCycle() {


        processValues.setTime(prevTime => prevTime + 1) 
        const queue:Array<number> = processValues.queue;
        const processDataCopy = [...processValues.processData]

        console.log(processValues.time, processValues.processData)

        switch (processValues.escalonamento) {
            case 'FIFO': 
                 for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].arriveTime > 0) {
                        processDataCopy[i].arriveTime -= 1
                    } else {
                        if (!queue.includes(i)) queue.push(i)      
                    }    
                }
                if (queue[0] === undefined) break;
                if (processDataCopy[queue[0]].executionTime === 0) {
                   processDataCopy.splice(queue[0], 1)
                   queue.shift
                   processDataCopy[queue[0]].state = 'executando';
                } else {
                    processDataCopy[queue[0]].executionTime -= 1
                }
            break;
            case 'SJF':
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].arriveTime > 0) {
                        processDataCopy[i].arriveTime -= 1
                    } else {
                        if (!queue.includes(i)) queue.push(i)      
                    }    
                }
                for (let i = 0; i < queue.length; i++) {
                    let faster:number = processDataCopy[i].executionTime 
                    for (let j = queue.length - 1; j > i; j--) {
                            if (processDataCopy[j].executionTime < faster)
                                faster = j
                    }
                    let aux:ProcessDataType = processDataCopy[i]
                    processDataCopy[i] = processDataCopy[faster]
                    processDataCopy[faster] = aux
                }
                if (queue[0] === undefined) break;
                if (processDataCopy[queue[0]].executionTime === 0) {
                   processDataCopy.splice(queue[0], 1)
                   queue.shift
                   processDataCopy[queue[0]].state = 'executando';
                } else {
                    processDataCopy[queue[0]].executionTime -= 1
                }
            break;
            case 'Round Robin':
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].arriveTime > 0) {
                        processDataCopy[i].arriveTime -= 1
                    } else {
                        if (!queue.includes(i)) queue.push(i)      
                    }    
                }
                if (queue[0] === undefined) break;
                if (processDataCopy[queue[0]].executionTime === 0) {
                   processDataCopy.splice(queue[0], 1)
                   queue.shift
                   processDataCopy[queue[0]].state = 'executando';
                }
                if (processDataCopy[queue[0]].ownQuantum !== 0 &&
                processDataCopy[queue[0]].state === 'executando') {
                    processDataCopy[queue[0]].ownQuantum -= 1
                    processDataCopy[queue[0]].executionTime -= 1
                }
                if (processDataCopy[queue[0]].ownQuantum === 0 &&
                processDataCopy[queue[0]].state === 'executando') {
                    processDataCopy[queue[0]].state = 'espera';
                    processDataCopy[queue[0]].ownQuantum = processValues.quantum;
                    queue.push(queue[0])
                    queue.shift;  
                    processDataCopy[queue[0]].state = 'sobrecarga';

                }
                if (processDataCopy[queue[0]].overload !== 0 &&
                processDataCopy[queue[0]].state === 'sobrecarga') {
                    processDataCopy[queue[0]].overload -= 1
                }
                if (processDataCopy[queue[0]].overload !== 0 &&
                processDataCopy[queue[0]].state === 'sobrecarga') {
                    processDataCopy[queue[0]].state = 'executando'
                } 
            break;
            case 'EDF':
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].arriveTime === 0 &&
                    processDataCopy[i].deadline > 0) {
                        processDataCopy[i].deadline -= 1

                    }
                    if (processDataCopy[i].arriveTime > 0) {
                        processDataCopy[i].arriveTime -= 1
                    } else {
                        if (!queue.includes(i)) queue.push(i)      
                    }
                    
                }
                for (let i = 0; i < queue.length; i++) {
                    let critical:number = processDataCopy[i].deadline 
                    for (let j = queue.length - 1; j > i; j--) {
                            if (processDataCopy[j].deadline < critical)
                                critical = j
                    }
                    let aux:ProcessDataType = processDataCopy[i]
                    processDataCopy[i] = processDataCopy[critical]
                    processDataCopy[critical] = aux
                }
                if (queue[0] === undefined) break;
                if (processDataCopy[queue[0]].executionTime === 0) {
                   processDataCopy.splice(queue[0], 1)
                   queue.shift
                   processDataCopy[queue[0]].state = 'executando';
                }
                 if (processDataCopy[queue[0]].ownQuantum !== 0 &&
                processDataCopy[queue[0]].state === 'executando') {
                    processDataCopy[queue[0]].ownQuantum -= 1
                    processDataCopy[queue[0]].executionTime -= 1
                }
                if (processDataCopy[queue[0]].ownQuantum === 0 &&
                processDataCopy[queue[0]].state === 'executando') {
                    processDataCopy[queue[0]].state = 'espera';
                    processDataCopy[queue[0]].ownQuantum = processValues.quantum;
                    queue.push(queue[0])
                    queue.shift;  
                    processDataCopy[queue[0]].state = 'sobrecarga';

                }
                if (processDataCopy[queue[0]].overload !== 0 &&
                processDataCopy[queue[0]].state === 'sobrecarga') {
                    processDataCopy[queue[0]].overload -= 1
                }
                if (processDataCopy[queue[0]].overload !== 0 &&
                processDataCopy[queue[0]].state === 'sobrecarga') {
                    processDataCopy[queue[0]].state = 'executando'
                } 


            break;
        }
        processValues.setProcessData(processDataCopy)
        processValues.setQueue(queue)
    }

  function confirmSelection() {
          processValues.setProcessStart(true)
          cycleInterval = setInterval(() => { runCycle() }, 1000)
  }

  function clearSelection() {
          clearInterval(cycleInterval)
          let processes:Array<any> = []
          for (let i = 0; i < processValues.numeroDeProcessos; i++) {
                    processes.push({ 
                        arriveTime: 0, executionTime: 0, 
                        deadline: 0, pages: 0})
              }
          processValues.setProcessData(processes)
   }
  return (
    <div className="process-list">
      <h2>Processos</h2>
      <div className="list-container">
        {processValues.processData.map((item:ProcessDataType, index:number) => {
                 
                return(
                    <Process data={item} index={index} />
                )}
                )
            }
      </div>
      <div className="align-end">
        <button onClick={clearSelection} className="btn clear align-end">
          Limpar
        </button>
        <button
          onClick={confirmSelection}
          className="btn confirm align-end"
        >
      Confirmar
        </button>
        </div>
    </div>
  );
}
