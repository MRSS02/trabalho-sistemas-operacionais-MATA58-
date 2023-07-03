import "./style.scss";
import { useEffect, useContext } from 'react';
import { ProcessProvider } from '../../Providers/ProcessProvider'
import { ProcessDataType } from '../../types'
import Process from './Process'

export default function Chart() {  

    const processValues = useContext(ProcessProvider)

        useEffect(() => {

                const queue:Array<number> = [...processValues.queue];
                const processDataCopy = [...processValues.processData]
                const executionHistoryCopy = [...processValues.executionHistory]

                console.log(processValues.time, processValues.processData)

                const currentExecution:Array<string> = []

                switch (processValues.escalonamento) {
                case 'FIFO': { 
                const currentExecution:Array<string> = []
                if (executionHistoryCopy.length === 0 && processValues.time === 1) {
                for (let i = 0; i < processDataCopy.length; i++) {
                if (processDataCopy[i].arriveTime === 0) {
                processDataCopy[i].state = 'executando';
                break;
                }
                }
                for (let i = 0; i < processDataCopy.length; i++) {
                currentExecution.push(processDataCopy[i].state)
                }
                executionHistoryCopy.push(currentExecution)
                }
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].arriveTime > 0) {
                        processDataCopy[i].arriveTime -= 1
                    } else {
                        if (processDataCopy[i].state === 'a caminho') 
                            processDataCopy[i].state = 'espera'
                                if (!queue.includes(i) && 
                                        processDataCopy[i].state !== 'finalizado') queue.push(i)
                                    if (processDataCopy[i].state === 'executando' &&
                                            processDataCopy[i].executionTime === 0)
                                        processDataCopy[i].state = 'finalizado'
                    }    
                }
                if (queue[0] === undefined) break;
                for (let i = 0; i < queue.length; i++) {
                    if (processDataCopy[queue[i]].state !== 'finalizado' &&
                    processDataCopy[queue[i]].state !== 'a caminho')
                        processDataCopy[queue[i]].turnaround += 1
                }
                if (processDataCopy[queue[0]].executionTime === 0) {
                    queue.shift()
                        if (queue[0] === undefined) break;
                    processDataCopy[queue[0]].state = 'executando';  
                    processDataCopy[queue[0]].executionTime -= 1
                } else {
                    processDataCopy[queue[0]].state = 'executando';  
                    processDataCopy[queue[0]].executionTime -= 1
                }
                break; }
                case 'SJF': {
                const currentExecution:Array<string> = []
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].arriveTime > 0) {
                        processDataCopy[i].arriveTime -= 1
                    } else {
                        if (processDataCopy[i].state === 'a caminho') 
                            processDataCopy[i].state = 'espera'
                                if (!queue.includes(i) && 
                                        processDataCopy[i].state !== 'finalizado') {
                                        queue.push(i)
                                        for (let i = queue.length - 1; i > 0; i--) {
                                            if(processDataCopy[queue[i]].state !== 'executando' &&
                                            processDataCopy[queue[i - 1]].state !== 'executando' &&
                                            processDataCopy[queue[i]].executionTime < 
                                            processDataCopy[queue[i - 1]].executionTime) 
                                                [queue[i], queue[i - 1]] = [queue[i - 1], queue[i]]
                                            else if (i > 1 && processDataCopy[queue[i - 1]].state !== 'executando' &&
                                            processDataCopy[queue[i]].executionTime < 
                                            processDataCopy[queue[i - 2]].executionTime)
                                                [queue[i], queue[i - 2]] = [queue[i - 2], queue[i]]
                                        }
                                    }
                                    if (processDataCopy[i].state === 'executando' &&
                                            processDataCopy[i].executionTime === 0)
                                        processDataCopy[i].state = 'finalizado'
                    }    
                }
                if (executionHistoryCopy.length === 0 && processValues.time === 1) {
                processDataCopy[queue[0]].state = 'executando'               
                for (let i = 0; i < processDataCopy.length; i++) {
                currentExecution.push(processDataCopy[i].state)
                }
                executionHistoryCopy.push(currentExecution)
                }
                if (queue[0] === undefined) break;
                for (let i = 0; i < queue.length; i++) {
                    if (processDataCopy[queue[i]].state !== 'finalizado' &&
                    processDataCopy[queue[i]].state !== 'a caminho')
                        processDataCopy[queue[i]].turnaround += 1
                }
               if (processDataCopy[queue[0]].executionTime === 0) {
                    queue.shift()
                        if (queue[0] === undefined) break;
                    processDataCopy[queue[0]].state = 'executando';  
                    processDataCopy[queue[0]].executionTime -= 1
                } else {
                    processDataCopy[queue[0]].state = 'executando';  
                    processDataCopy[queue[0]].executionTime -= 1
                }
                break; }
                case 'Round Robin': {
                const currentExecution:Array<string> = []
                if (executionHistoryCopy.length === 0 && processValues.time === 1) {
                for (let i = 0; i < processDataCopy.length; i++) {
                if (processDataCopy[i].arriveTime === 0) {
                processDataCopy[i].state = 'executando';
                break;
                }
                }
                for (let i = 0; i < processDataCopy.length; i++) {
                currentExecution.push(processDataCopy[i].state)
                }
                executionHistoryCopy.push(currentExecution)
                }
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].arriveTime > 0) {
                        processDataCopy[i].arriveTime -= 1
                    } else {
                        if (processDataCopy[i].state === 'a caminho') 
                            processDataCopy[i].state = 'espera'
                                if (processDataCopy[i].state === 'executando' &&
                                            processDataCopy[i].executionTime === 0)
                                        processDataCopy[i].state = 'finalizado'
                                if (!queue.includes(i) && 
                                        processDataCopy[i].state !== 'finalizado') queue.push(i)
                                    
                    }    
                }
                if (queue[0] === undefined) break;
                for (let i = 0; i < queue.length; i++) {
                    if (processDataCopy[queue[i]].state !== 'finalizado' &&
                    processDataCopy[queue[i]].state !== 'a caminho')
                        processDataCopy[queue[i]].turnaround += 1
                }
                if ((processDataCopy[queue[queue.length - 1]].state === 'executando' &&
                processDataCopy[queue[queue.length - 1]].ownQuantum === 0) || 
                (queue.length > 1 && processDataCopy[queue[queue.length - 1]].state === 'executando')) {
                    processDataCopy[queue[queue.length - 1]].state = 'espera'
                    processDataCopy[queue[0]].ownQuantum = processValues.quantum;
                }
                if (processDataCopy[queue[0]].overload > 0) {
                    processDataCopy[queue[0]].state = 'sobrecarga';
                    processDataCopy[queue[0]].overload -= 1;
                    break
                }
                processDataCopy[queue[0]].state = 'executando';  
                processDataCopy[queue[0]].executionTime -= 1;
                processDataCopy[queue[0]].ownQuantum -= 1;
                if (processDataCopy[queue[0]].executionTime === 0) {
                    queue.shift()
                    if (queue[0] === undefined) break;
                } else if (processDataCopy[queue[0]].ownQuantum === 0) {
                        queue.push(queue[0]);
                        queue.shift();
                        processDataCopy[queue[0]].overload =  processValues.sobrecarga;

                }
                break; }
                case 'EDF':

                const currentExecution:Array<string> = []
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].arriveTime > 0) {
                        processDataCopy[i].arriveTime -= 1
                    } else {
                        if (processDataCopy[i].state === 'a caminho') 
                            processDataCopy[i].state = 'espera'
                                if (processDataCopy[i].state === 'executando' &&
                                            processDataCopy[i].executionTime === 0)
                                        processDataCopy[i].state = 'finalizado'
                                if (!queue.includes(i) && 
                                        processDataCopy[i].state !== 'finalizado') queue.push(i)
                                
                                    
                    }    
                }
                for (let i = queue.length - 1; i > 0; i--) {
                                            if(processDataCopy[queue[i]].deadline < 
                                            processDataCopy[queue[i - 1]].deadline) {
                                                [queue[i], queue[i - 1]] = [queue[i - 1], queue[i]]
                                                let aux = processDataCopy[queue[i]].overload 
                                                processDataCopy[queue[i]].overload = processDataCopy[queue[i - 1]].overload
                                                processDataCopy[queue[i - 1]].overload = aux
                                            }
                                            else if (i > 1 && processDataCopy[queue[i]].deadline < 
                                            processDataCopy[queue[i - 2]].deadline) {
                                                [queue[i], queue[i - 2]] = [queue[i - 2], queue[i]]
                                                let aux = processDataCopy[queue[i]].overload 
                                                processDataCopy[queue[i]].overload = processDataCopy[queue[i - 2]].overload
                                                processDataCopy[queue[i - 2]].overload = aux
                                           }
                                        }
                if (executionHistoryCopy.length === 0 && processValues.time === 1) {
                processDataCopy[queue[0]].state = 'executando'               
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].deadline > 0
                    && processDataCopy[i].executionTime !== 0
                    && processDataCopy[i].state !== 'a caminho') {
                        processDataCopy[i].deadline -= 1;
                    } else {
                        if (processDataCopy[i].deadline === 0)
                            processDataCopy[i].brokeDeadline = true;        
                    }
                currentExecution.push(processDataCopy[i].state)
                }
                executionHistoryCopy.push(currentExecution)
                }
                if (queue[0] === undefined) break;
                
                for (let i = 0; i < queue.length; i++) {
                    if (i > 0 && processDataCopy[queue[i]].state !== 'a caminho')
                        processDataCopy[queue[i]].state = 'espera'
                    if (processDataCopy[queue[i]].state !== 'finalizado' &&
                    processDataCopy[queue[i]].state !== 'a caminho')
                        processDataCopy[queue[i]].turnaround += 1
                }
                if ((processDataCopy[queue[queue.length - 1]].state === 'executando' &&
                processDataCopy[queue[queue.length - 1]].ownQuantum === 0) || 
                (queue.length > 1 && processDataCopy[queue[queue.length - 1]].state === 'executando')) {
                    processDataCopy[queue[queue.length - 1]].state = 'espera'
                    processDataCopy[queue[0]].ownQuantum = processValues.quantum;
                }
                if (processDataCopy[queue[0]].overload > 0) {
                    processDataCopy[queue[0]].state = 'sobrecarga';
                    processDataCopy[queue[0]].overload -= 1;
                    break
                }
                processDataCopy[queue[0]].state = 'executando';  
                processDataCopy[queue[0]].executionTime -= 1;
                processDataCopy[queue[0]].ownQuantum -= 1;
                if (processDataCopy[queue[0]].executionTime === 0) {
                    queue.shift()
                    if (queue[0] === undefined) break;
                } else if (processDataCopy[queue[0]].ownQuantum === 0) {
                        queue.push(queue[0]);
                        queue.shift();
                        processDataCopy[queue[0]].overload =  processValues.sobrecarga;

                }
 
                for (let i = 0; i < processDataCopy.length; i++) {
                    if (processDataCopy[i].deadline > 0
                    && processDataCopy[i].executionTime !== 0
                    && processDataCopy[i].state !== 'a caminho') {
                        processDataCopy[i].deadline -= 1;
                    } else {
                        if (processDataCopy[i].deadline === 0)
                            processDataCopy[i].brokeDeadline = true;        
                    }
                }

                }
                processValues.setProcessData(processDataCopy)
                    processValues.setQueue(queue)

                    
                    for (let i = 0; i < processDataCopy.length; i++) {
                        currentExecution.push(processDataCopy[i].state)
                    } 
                executionHistoryCopy.push(currentExecution)
                    if (executionHistoryCopy.length > 15) executionHistoryCopy.shift()
                        processValues.setExecutionHistory(executionHistoryCopy)
                            let allFinished = true
                            for (let i = 0; i < processValues.processData.length; i++) {
                                if (processValues.processData[i].executionTime !== 0) {
                                    allFinished = false;
                                    break;
                                }
                            }
                let turnaround = 0
                for (let i = 0; i < processValues.numeroDeProcessos; i++) {
                    turnaround += processValues.processData[i].turnaround;
                }
                turnaround = turnaround / processValues.numeroDeProcessos
                processValues.setTurnaround(turnaround)
                if (!allFinished) setTimeout(() => 
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
                            <td className={`ui_item ${item.brokeDeadline && "red-text"}`}>
                            {item.deadline}</td>
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

        <h2>Fila</h2>
        <div className="list-container">
         {processValues.queue.map((item:number, index:number) => {
                return(
                    <Process data={processValues.processData[item]} index={item} />
                )}
                )
            }
        

    </div>

        <footer>
        <div className="turnaround">Turnaround Médio: {processValues.turnaround}</div>
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
