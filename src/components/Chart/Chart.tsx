import "./style.scss";
import { useEffect, useContext } from 'react';
import { ProcessProvider } from '../../Providers/ProcessProvider'
import { ProcessDataType } from '../../types'
import Process from './Process'

export default function Chart() {  
   
   const processValues = useContext(ProcessProvider)

   useEffect(() => {
        
        const queue:Array<number> = processValues.queue;
        const processDataCopy = [...processValues.processData]

        console.log(processValues.time, processValues.processData)

        switch (processValues.escalonamento) {
            case 'FIFO': 
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].arriveTime > 0) {
                        processDataCopy[i].arriveTime -= 1
                    } else {
                        if (processDataCopy[i].state === 'a caminho') 
                            processDataCopy[i].state = 'espera'
                        if (!queue.includes(i) && 
                        processDataCopy[i].state !== 'finalizado') queue.push(i) 
                    }    
                }
                if (queue[0] === undefined) break;
                if (processDataCopy[queue[0]].executionTime === 0) {
                    processDataCopy[queue[0]].state = 'finalizado';
                   queue.shift()
                   if (queue[0] === undefined) break;
                   processDataCopy[queue[0]].state = 'executando';
                   processDataCopy[queue[0]].executionTime -= 1
                } else {
                    processDataCopy[queue[0]].state = 'executando';  
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
                   queue.shift()
                   if (queue[0] === undefined) break;
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
                   queue.shift()
                   if (queue[0] === undefined) break;
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
                    queue.shift();
                    if (queue[0] === undefined) break;
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
                   queue.shift()
                   if (queue[0] === undefined) break;
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
                    queue.shift();
                    if (queue[0] === undefined) break;
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

        const currentExecution:Array<string> = []
        for (let i = 0; i < processDataCopy.length; i++) {
            currentExecution.push(processDataCopy[i].state)
        }
        const executionHistoryCopy = [...processValues.executionHistory]
        executionHistoryCopy.push(currentExecution)
        if (executionHistoryCopy.length > 15) executionHistoryCopy.shift()
        processValues.setExecutionHistory(executionHistoryCopy)
        setTimeout(() => 
        processValues.setTime((prevTime:number) => prevTime + 1), 1000) 

    }, [processValues.time]) 

   return (
    <div className="chart-container">
      <h2>Escalonamento</h2>

      <h3>Tempo: { processValues.time } segundos</h3>
      <div className="chart">
        <div className="chart__aside">
          <div className="top">
            
            <table>
                <tbody>
                {processValues.processData.map((item:ProcessDataType, index:number) => {
                 
                return(<tr>
                    <td className="ui_item">{item.arriveTime}</td>
                    <td className="ui_item">{item.executionTime}</td>
                    <td className="ui_item">{item.deadline}</td>
                    <td className="ui_item">{index}</td>
                    </tr>
                )
                })}
                </tbody>
            </table>
          </div>
          <div className="bottom">
            <div className="tempo-de-chegada">TC</div>
            <div className="tempo-de-execucao">TE</div>
            <div className="deadline">D</div>
            <div className="numero-do-processo">N°</div>
          </div>
        </div>

        <div className="chart__main">
            <table className="processes">
                <tbody>
               {processValues.executionHistory.map((item:Array<string>) => {
                       return (
                            <tr>
                                {item.map((value:string) => {
                                    return (
                                        <td className= {`grid_item ${value === 'executando' ? 
                                        "green" : (value === 'espera' ? "black" : 
                                        ((value === 'finalizado' || value === 'a caminho') ? "white" : "red"))}`} />
                                    )        
                                })}
                            </tr>
                       )
                       
                   })} 
                   </tbody>
            </table>
        </div>
      </div>

      <div className="list-container">
        {processValues.processData.map((item:ProcessDataType, index:number) => {
                 
                if (item.state === 'finalizado') return (<></>); 
                else return(
                    <Process data={item} index={index} />
                )}
                )
            }
      </div>

      <footer>
        <div className="turnaround">Turnaround Médio: X</div>
        <div className="legends">
          <div className="box green" />
          Executando
          <div className="box red" />
          Sobrecarga
          <div className="box black" />
          Espera
        </div>
      </footer>
      
    </div>
  );
}
