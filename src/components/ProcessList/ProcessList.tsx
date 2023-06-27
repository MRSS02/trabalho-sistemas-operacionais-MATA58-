import Process from "./Process/Process";
import "./style.scss";
import { useContext } from 'react'
import { ProcessProvider, ContextInterface } from '../../Providers/ProcessProvider'
import { ProcessDataType } from '../../types'

export default function ProcessList() {
  
  const processValues = useContext(ProcessProvider)

  function confirmSelection() {
          processValues.setProcessStart(true)
          
  }

  function clearRun() {
          let processes:Array<any> = []
          for (let i = 0; i < processValues.numeroDeProcessos; i++) {
                    processes.push({ 
                        state: 'a caminho', ownQuantum: processValues.quantum,
                        arriveTime: 0, overload: 0, executionTime: 0, 
                        deadline: 0, pages: 0, brokeDeadline: false,
                        turnaround: 0})
              }
          processValues.setProcessStart(false)
          processValues.setProcessData(processes)
          processValues.setMemoryMap([])
          processValues.setDiskTable([])  
          processValues.setTime(0);
          processValues.setProcessStart(true)


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
        <button
          onClick={confirmSelection}
          className="btn confirm align-end"
          disabled={processValues.processStart}  
        >
      Iniciar
        </button>
        </div>
    </div>
  );
}
