import Process from "./Process/Process";
import "./style.scss";
import { useContext } from 'react'
import { ProcessProvider } from '../../Providers/ProcessProvider'
import { ProcessDataType } from '../../types'

export default function ProcessList() {
  
  const processValues = useContext(ProcessProvider)

  function confirmSelection() {
          processValues.setProcessStart(true)
  }

  function clearSelection() {
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
